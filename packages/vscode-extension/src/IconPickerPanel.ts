import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import type {
  WebviewMessage,
  CodeGenerationOptions,
  IconData,
  TriggerType,
  MotionType,
} from './types';

/**
 * Manages the MotionIcons picker webview panel
 */
export class IconPickerPanel {
  public static readonly viewType = 'motionicon.iconPicker';
  public static currentPanel: IconPickerPanel | undefined;

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private readonly _context: vscode.ExtensionContext;
  private _disposables: vscode.Disposable[] = [];
  private _lastActiveEditor: vscode.TextEditor | undefined;

  private constructor(
    panel: vscode.WebviewPanel,
    extensionUri: vscode.Uri,
    context: vscode.ExtensionContext,
    lastActiveEditor?: vscode.TextEditor
  ) {
    this._panel = panel;
    this._extensionUri = extensionUri;
    this._context = context;
    this._lastActiveEditor = lastActiveEditor;

    // Set the webview's initial html content
    this._update();

    // Listen for when the panel is disposed
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    // Handle messages from the webview
    this._panel.webview.onDidReceiveMessage(
      (message: WebviewMessage) => this._handleMessage(message),
      null,
      this._disposables
    );

    // Update content when view becomes visible
    this._panel.onDidChangeViewState(
      () => {
        if (this._panel.visible) {
          this._update();
        }
      },
      null,
      this._disposables
    );
  }

  /**
   * Create or show the icon picker panel
   */
  public static createOrShow(
    extensionUri: vscode.Uri,
    context: vscode.ExtensionContext
  ): void {
    // Capture the active editor BEFORE opening the panel
    const activeEditor = vscode.window.activeTextEditor;
    const column = activeEditor?.viewColumn;

    // If we already have a panel, show it and update the stored editor
    if (IconPickerPanel.currentPanel) {
      IconPickerPanel.currentPanel._lastActiveEditor = activeEditor;
      IconPickerPanel.currentPanel._panel.reveal(column);
      return;
    }

    // Otherwise, create a new panel
    const panel = vscode.window.createWebviewPanel(
      IconPickerPanel.viewType,
      'MotionIcons Picker',
      column || vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [
          vscode.Uri.joinPath(extensionUri, 'dist'),
          vscode.Uri.joinPath(extensionUri, 'data'),
        ],
      }
    );

    IconPickerPanel.currentPanel = new IconPickerPanel(
      panel,
      extensionUri,
      context,
      activeEditor
    );
  }

  /**
   * Revive the panel from a serialized state
   */
  public static revive(
    panel: vscode.WebviewPanel,
    extensionUri: vscode.Uri,
    context: vscode.ExtensionContext
  ): void {
    IconPickerPanel.currentPanel = new IconPickerPanel(
      panel,
      extensionUri,
      context
    );
  }

  /**
   * Clean up resources
   */
  public dispose(): void {
    IconPickerPanel.currentPanel = undefined;

    this._panel.dispose();

    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }

  /**
   * Handle messages from the webview
   */
  private async _handleMessage(message: WebviewMessage): Promise<void> {
    switch (message.type) {
      case 'ready':
        await this._sendIconData();
        await this._sendFavorites();
        break;

      case 'insertIcon':
        await this._insertIcon(message.payload);
        break;

      case 'addFavorite':
        await this._addFavorite(message.payload.iconId);
        break;

      case 'removeFavorite':
        await this._removeFavorite(message.payload.iconId);
        break;

      case 'getFavorites':
        await this._sendFavorites();
        break;

      case 'copyCode':
        await vscode.env.clipboard.writeText(message.payload.code);
        vscode.window.showInformationMessage('Code copied to clipboard!');
        break;
    }
  }

  /**
   * Send icon data to the webview
   */
  private async _sendIconData(): Promise<void> {
    const iconData = await this._loadIconData();
    this._panel.webview.postMessage({
      type: 'iconData',
      payload: iconData,
    });
  }

  /**
   * Load icon data from the extracted JSON file
   */
  private async _loadIconData(): Promise<IconData> {
    const dataPath = path.join(
      this._extensionUri.fsPath,
      'data',
      'icons.json'
    );

    try {
      if (fs.existsSync(dataPath)) {
        const data = fs.readFileSync(dataPath, 'utf-8');
        return JSON.parse(data) as IconData;
      }
    } catch (error) {
      console.error('Failed to load icon data:', error);
    }

    // Return empty data if file doesn't exist
    return {
      icons: [],
      categories: [],
      version: '1.0.0',
    };
  }

  /**
   * Default values for icon props
   * These match the defaults in the motionicon library
   */
  private static readonly DEFAULTS = {
    size: 24,
    strokeWidth: 2,
    lively: 'scale' as MotionType,
    trigger: 'hover' as TriggerType,
    animated: true,
  };

  /**
   * Insert icon code at the cursor position with smart import handling
   */
  private async _insertIcon(options: CodeGenerationOptions): Promise<void> {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage('No active text editor found');
      return;
    }

    const document = editor.document;
    const documentText = document.getText();

    // Generate JSX component code (without import)
    const jsxCode = this._generateJsxCode(options);

    // Handle import if requested
    let importEdit: { range: vscode.Range; text: string } | null = null;
    if (options.includeImport && options.importStyle === 'named') {
      importEdit = this._getImportEdit(document, documentText, options.iconName);
    }

    // Determine insertion position for JSX
    const cursorPosition = editor.selection.active;
    let jsxInsertPosition = cursorPosition;

    // If cursor is in the import area, insert after imports
    const importAreaEnd = this._findImportAreaEnd(documentText);
    const cursorOffset = document.offsetAt(cursorPosition);
    if (cursorOffset <= importAreaEnd) {
      // Find a better position after imports
      jsxInsertPosition = document.positionAt(importAreaEnd);
    }

    // Apply edits
    await editor.edit((editBuilder) => {
      // Add import if needed
      if (importEdit) {
        if (importEdit.range.isEmpty) {
          editBuilder.insert(importEdit.range.start, importEdit.text);
        } else {
          editBuilder.replace(importEdit.range, importEdit.text);
        }
      }

      // Insert JSX at cursor position
      editBuilder.insert(jsxInsertPosition, jsxCode);
    });

    // Format the document if we added an import
    if (importEdit) {
      await vscode.commands.executeCommand('editor.action.formatDocument');
    }

    this._panel.webview.postMessage({
      type: 'insertSuccess',
      payload: { iconName: options.iconName },
    });

    vscode.window.showInformationMessage(
      `Inserted ${options.iconName} icon`
    );
  }

  /**
   * Find the end position of the import area in the document
   */
  private _findImportAreaEnd(text: string): number {
    const lines = text.split('\n');
    let lastImportEnd = 0;
    let currentOffset = 0;

    for (const line of lines) {
      const trimmed = line.trim();
      // Check if line is an import statement
      if (trimmed.startsWith('import ') || trimmed.startsWith('import{')) {
        lastImportEnd = currentOffset + line.length + 1; // +1 for newline
      }
      // Stop if we hit non-import code (excluding empty lines and comments)
      else if (trimmed && !trimmed.startsWith('//') && !trimmed.startsWith('/*') && !trimmed.startsWith('*')) {
        if (lastImportEnd > 0) {
          break;
        }
      }
      currentOffset += line.length + 1;
    }

    return lastImportEnd;
  }

  /**
   * Get the edit needed to add/update import statement
   */
  private _getImportEdit(
    document: vscode.TextDocument,
    documentText: string,
    iconName: string
  ): { range: vscode.Range; text: string } | null {
    // Look for existing motionicon import
    const importRegex = /import\s*\{([^}]*)\}\s*from\s*['"]motionicon['"]/g;
    const match = importRegex.exec(documentText);

    if (match) {
      // Existing import found - check if icon is already imported
      const existingImports = match[1];
      const importedNames = existingImports.split(',').map((s) => s.trim()).filter(Boolean);

      if (importedNames.includes(iconName)) {
        // Icon already imported, no edit needed
        return null;
      }

      // Add icon to existing import
      const newImports = [...importedNames, iconName].sort().join(', ');
      const newImportStatement = `import { ${newImports} } from 'motionicon'`;

      const startOffset = match.index;
      const endOffset = match.index + match[0].length;

      return {
        range: new vscode.Range(
          document.positionAt(startOffset),
          document.positionAt(endOffset)
        ),
        text: newImportStatement,
      };
    }

    // No existing import - add new import at top after other imports
    const importAreaEnd = this._findImportAreaEnd(documentText);
    const insertPosition = document.positionAt(importAreaEnd);

    // Determine if we need newlines
    const textBefore = documentText.slice(Math.max(0, importAreaEnd - 2), importAreaEnd);
    const needsNewlineBefore = importAreaEnd > 0 && !textBefore.endsWith('\n');

    const newImport = `${needsNewlineBefore ? '\n' : ''}import { ${iconName} } from 'motionicon'\n`;

    return {
      range: new vscode.Range(insertPosition, insertPosition),
      text: newImport,
    };
  }

  /**
   * Generate JSX code for an icon (without import statement)
   * Only includes props that differ from defaults
   */
  private _generateJsxCode(options: CodeGenerationOptions): string {
    const {
      iconName,
      lively,
      defaultMotionType,
      size,
      color,
      strokeWidth,
      trigger,
      animated,
      importStyle,
    } = options;

    // Build props - only include non-default values
    const props: string[] = [];

    // Size: only include if different from default (24)
    if (size !== undefined && size !== IconPickerPanel.DEFAULTS.size) {
      props.push(`size={${size}}`);
    }

    // StrokeWidth: only include if different from default (2)
    if (strokeWidth !== undefined && strokeWidth !== IconPickerPanel.DEFAULTS.strokeWidth) {
      props.push(`strokeWidth={${strokeWidth}}`);
    }

    // MotionType: only include if different from default or icon's defaultMotionType
    const effectiveDefaultMotionType = defaultMotionType || IconPickerPanel.DEFAULTS.lively;
    if (lively !== effectiveDefaultMotionType) {
      props.push(`lively="${lively}"`);
    }

    // Trigger: only include if different from default ('hover')
    if (trigger !== undefined && trigger !== IconPickerPanel.DEFAULTS.trigger) {
      props.push(`trigger="${trigger}"`);
    }

    // Animated: only include if explicitly set to false (default is true)
    if (animated === false) {
      props.push(`animated={false}`);
    }

    // Color: always include if provided (no default)
    if (color) {
      props.push(`color="${color}"`);
    }

    // Generate component
    const componentName =
      importStyle === 'namespace' ? `MotionIcons.${iconName}` : iconName;

    if (props.length > 0) {
      return `<${componentName} ${props.join(' ')} />`;
    } else {
      return `<${componentName} />`;
    }
  }

  /**
   * Add an icon to favorites
   */
  private async _addFavorite(iconId: string): Promise<void> {
    const favorites = this._context.globalState.get<string[]>(
      'motionicon.favorites',
      []
    );
    if (!favorites.includes(iconId)) {
      favorites.push(iconId);
      await this._context.globalState.update('motionicon.favorites', favorites);
    }
    await this._sendFavorites();
  }

  /**
   * Remove an icon from favorites
   */
  private async _removeFavorite(iconId: string): Promise<void> {
    const favorites = this._context.globalState.get<string[]>(
      'motionicon.favorites',
      []
    );
    const index = favorites.indexOf(iconId);
    if (index > -1) {
      favorites.splice(index, 1);
      await this._context.globalState.update('motionicon.favorites', favorites);
    }
    await this._sendFavorites();
  }

  /**
   * Send favorites list to the webview
   */
  private async _sendFavorites(): Promise<void> {
    const favorites = this._context.globalState.get<string[]>(
      'motionicon.favorites',
      []
    );
    this._panel.webview.postMessage({
      type: 'favorites',
      payload: { favorites },
    });
  }

  /**
   * Update the webview content
   */
  private _update(): void {
    this._panel.title = 'MotionIcons Picker';
    this._panel.webview.html = this._getHtmlForWebview();
  }

  /**
   * Generate the HTML content for the webview
   */
  private _getHtmlForWebview(): string {
    // Try to load the built webview app (built to dist/webview by vite)
    const webviewDistPath = path.join(
      this._extensionUri.fsPath,
      'dist',
      'webview'
    );

    if (fs.existsSync(path.join(webviewDistPath, 'index.html'))) {
      return this._getProductionHtml(webviewDistPath);
    }

    // Fallback to development/placeholder HTML
    return this._getDevelopmentHtml();
  }

  /**
   * Get production HTML from built webview
   */
  private _getProductionHtml(webviewDistPath: string): string {
    const webview = this._panel.webview;

    // Read the index.html from the webview dist
    let html = fs.readFileSync(
      path.join(webviewDistPath, 'index.html'),
      'utf-8'
    );

    // Convert local paths to webview URIs
    const assetsUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'dist', 'webview', 'assets')
    );

    // Replace relative paths with webview URIs (handles both ./ and / prefixes)
    html = html.replace(
      /href="\.\/assets\//g,
      `href="${assetsUri.toString()}/`
    );
    html = html.replace(
      /src="\.\/assets\//g,
      `src="${assetsUri.toString()}/`
    );
    html = html.replace(
      /href="\/assets\//g,
      `href="${assetsUri.toString()}/`
    );
    html = html.replace(
      /src="\/assets\//g,
      `src="${assetsUri.toString()}/`
    );

    // Remove existing CSP meta tag (we'll add our own)
    html = html.replace(
      /<meta\s+http-equiv="Content-Security-Policy"[^>]*>/gi,
      ''
    );

    // Add proper CSP meta tag for VSCode webview
    const csp = [
      `default-src 'none'`,
      `style-src ${webview.cspSource} 'unsafe-inline'`,
      `script-src ${webview.cspSource} 'unsafe-inline'`,
      `img-src ${webview.cspSource} data: https:`,
      `font-src ${webview.cspSource}`,
      `connect-src ${webview.cspSource}`,
    ].join('; ');

    html = html.replace(
      '<head>',
      `<head>
        <meta http-equiv="Content-Security-Policy" content="${csp}">`
    );

    return html;
  }

  /**
   * Get development/placeholder HTML
   */
  private _getDevelopmentHtml(): string {
    const nonce = this._getNonce();
    const csp = this._getContentSecurityPolicy(nonce);

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="${csp}">
  <title>MotionIcons Picker</title>
  <style nonce="${nonce}">
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: var(--vscode-font-family);
      font-size: var(--vscode-font-size);
      color: var(--vscode-foreground);
      background-color: var(--vscode-editor-background);
      padding: 20px;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }
    h1 {
      margin-bottom: 20px;
      color: var(--vscode-titleBar-activeForeground);
    }
    .message {
      padding: 40px;
      background-color: var(--vscode-editor-inactiveSelectionBackground);
      border-radius: 8px;
      margin-top: 20px;
    }
    .message p {
      margin-bottom: 10px;
    }
    code {
      background-color: var(--vscode-textCodeBlock-background);
      padding: 2px 6px;
      border-radius: 4px;
      font-family: var(--vscode-editor-font-family);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>MotionIcons Picker</h1>
    <div class="message">
      <p>The webview app has not been built yet.</p>
      <p>Run <code>npm run build:webview</code> to build the picker interface.</p>
    </div>
  </div>
  <script nonce="${nonce}">
    const vscode = acquireVsCodeApi();

    // Signal that webview is ready
    vscode.postMessage({ type: 'ready' });

    // Listen for messages from extension
    window.addEventListener('message', event => {
      const message = event.data;
      console.log('Received message:', message);
    });
  </script>
</body>
</html>`;
  }

  /**
   * Get Content Security Policy for the webview
   */
  private _getContentSecurityPolicy(nonce: string): string {
    const webview = this._panel.webview;
    return [
      `default-src 'none'`,
      `style-src ${webview.cspSource} 'unsafe-inline'`,
      `script-src 'nonce-${nonce}' ${webview.cspSource}`,
      `img-src ${webview.cspSource} data: https:`,
      `font-src ${webview.cspSource}`,
      `connect-src ${webview.cspSource}`,
    ].join('; ');
  }

  /**
   * Generate a random nonce for CSP
   */
  private _getNonce(): string {
    let text = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
