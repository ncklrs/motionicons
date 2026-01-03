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
 * Provides the LivelyIcons picker as a sidebar webview
 */
export class IconPickerViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'livelyicons.iconPicker';

  private _view?: vscode.WebviewView;
  private _context: vscode.ExtensionContext;

  constructor(
    private readonly _extensionUri: vscode.Uri,
    context: vscode.ExtensionContext
  ) {
    this._context = context;
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ): void {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.joinPath(this._extensionUri, 'dist'),
        vscode.Uri.joinPath(this._extensionUri, 'data'),
      ],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage((message: WebviewMessage) => {
      this._handleMessage(message);
    });
  }

  private async _handleMessage(message: WebviewMessage): Promise<void> {
    switch (message.type) {
      case 'ready':
        await this._sendIconData();
        await this._sendFavorites();
        break;
      case 'insertIcon':
        // Webview sends { icon, customization }, convert to CodeGenerationOptions
        const msg = message as { type: 'insertIcon'; icon: string; customization: Record<string, unknown> };
        const iconId = msg.icon;
        const cust = msg.customization || {};

        // Find icon name from id (convert kebab-case to PascalCase)
        const iconName = iconId
          .split('-')
          .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
          .join('');

        await this._insertIcon({
          iconName,
          size: cust.size as number | undefined,
          strokeWidth: cust.strokeWidth as number | undefined,
          motionType: (cust.lively || cust.motionType) as MotionType | undefined,
          trigger: cust.trigger as TriggerType | undefined,
          animated: cust.animated as boolean | undefined,
          color: cust.color as string | undefined,
          includeImport: true,
        });
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

  private async _sendIconData(): Promise<void> {
    if (!this._view) return;
    const iconData = await this._loadIconData();
    this._view.webview.postMessage({ type: 'iconData', payload: iconData });
  }

  private async _loadIconData(): Promise<IconData> {
    const dataPath = path.join(this._extensionUri.fsPath, 'src', 'data', 'icons.json');
    try {
      if (fs.existsSync(dataPath)) {
        const data = fs.readFileSync(dataPath, 'utf-8');
        return JSON.parse(data) as IconData;
      }
    } catch (error) {
      console.error('Failed to load icon data:', error);
    }
    return { icons: [], categories: [], version: '1.0.0' };
  }

  private static readonly DEFAULTS = {
    size: 24,
    strokeWidth: 2,
    motionType: 'none' as MotionType,
    trigger: 'hover' as TriggerType,
    animated: true,
  };

  private async _insertIcon(options: CodeGenerationOptions): Promise<void> {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage('Open a file first, then click an icon to insert it');
      return;
    }

    const document = editor.document;
    const documentText = document.getText();
    const jsxCode = this._generateJsxCode(options);

    let importEdit: { range: vscode.Range; text: string } | null = null;
    if (options.includeImport !== false) {
      importEdit = this._getImportEdit(document, documentText, options.iconName);
    }

    const cursorPosition = editor.selection.active;

    await editor.edit((editBuilder) => {
      if (importEdit) {
        if (importEdit.range.isEmpty) {
          editBuilder.insert(importEdit.range.start, importEdit.text);
        } else {
          editBuilder.replace(importEdit.range, importEdit.text);
        }
      }
      editBuilder.insert(cursorPosition, jsxCode);
    });

    if (this._view) {
      this._view.webview.postMessage({ type: 'insertSuccess', payload: { iconName: options.iconName } });
    }
    vscode.window.showInformationMessage(`Inserted ${options.iconName}`);
  }

  private _generateJsxCode(options: CodeGenerationOptions): string {
    const { iconName, motionType, defaultMotionType, size, strokeWidth, trigger, animated, color } = options;
    const props: string[] = [];

    if (size !== undefined && size !== IconPickerViewProvider.DEFAULTS.size) {
      props.push(`size={${size}}`);
    }
    if (strokeWidth !== undefined && strokeWidth !== IconPickerViewProvider.DEFAULTS.strokeWidth) {
      props.push(`strokeWidth={${strokeWidth}}`);
    }
    if (color) {
      props.push(`color="${color}"`);
    }
    const effectiveDefault = defaultMotionType || IconPickerViewProvider.DEFAULTS.motionType;
    if (motionType && motionType !== effectiveDefault) {
      props.push(`motionType="${motionType}"`);
    }
    if (trigger !== undefined && trigger !== IconPickerViewProvider.DEFAULTS.trigger) {
      props.push(`trigger="${trigger}"`);
    }
    if (animated === false) {
      props.push(`animated={false}`);
    }

    return props.length > 0 ? `<${iconName} ${props.join(' ')} />` : `<${iconName} />`;
  }

  private _getImportEdit(
    document: vscode.TextDocument,
    documentText: string,
    iconName: string
  ): { range: vscode.Range; text: string } | null {
    const importRegex = /import\s*\{([^}]*)\}\s*from\s*['"](livelyicons\/icons|motionicon)['"]/g;
    const match = importRegex.exec(documentText);

    if (match) {
      const existingImports = match[1].split(',').map(s => s.trim()).filter(Boolean);
      if (existingImports.includes(iconName)) return null;
      const newImports = [...existingImports, iconName].sort().join(', ');
      return {
        range: new vscode.Range(
          document.positionAt(match.index),
          document.positionAt(match.index + match[0].length)
        ),
        text: `import { ${newImports} } from 'livelyicons/icons'`,
      };
    }

    const firstLine = document.lineAt(0);
    return {
      range: new vscode.Range(firstLine.range.start, firstLine.range.start),
      text: `import { ${iconName} } from 'livelyicons/icons'\n`,
    };
  }

  private async _addFavorite(iconId: string): Promise<void> {
    const favorites = this._context.globalState.get<string[]>('motionicon.favorites', []);
    if (!favorites.includes(iconId)) {
      favorites.push(iconId);
      await this._context.globalState.update('motionicon.favorites', favorites);
    }
    await this._sendFavorites();
  }

  private async _removeFavorite(iconId: string): Promise<void> {
    const favorites = this._context.globalState.get<string[]>('motionicon.favorites', []);
    const index = favorites.indexOf(iconId);
    if (index > -1) {
      favorites.splice(index, 1);
      await this._context.globalState.update('motionicon.favorites', favorites);
    }
    await this._sendFavorites();
  }

  private async _sendFavorites(): Promise<void> {
    if (!this._view) return;
    const favorites = this._context.globalState.get<string[]>('motionicon.favorites', []);
    this._view.webview.postMessage({ type: 'favorites', payload: { favorites } });
  }

  private _getHtmlForWebview(webview: vscode.Webview): string {
    const webviewDistPath = path.join(this._extensionUri.fsPath, 'dist', 'webview');

    if (fs.existsSync(path.join(webviewDistPath, 'index.html'))) {
      let html = fs.readFileSync(path.join(webviewDistPath, 'index.html'), 'utf-8');

      const assetsUri = webview.asWebviewUri(
        vscode.Uri.joinPath(this._extensionUri, 'dist', 'webview', 'assets')
      );

      html = html.replace(/href="\.\/assets\//g, `href="${assetsUri}/`);
      html = html.replace(/src="\.\/assets\//g, `src="${assetsUri}/`);
      html = html.replace(/<meta\s+http-equiv="Content-Security-Policy"[^>]*>/gi, '');

      const csp = [
        `default-src 'none'`,
        `style-src ${webview.cspSource} 'unsafe-inline'`,
        `script-src ${webview.cspSource} 'unsafe-inline'`,
        `img-src ${webview.cspSource} data: https:`,
        `font-src ${webview.cspSource}`,
      ].join('; ');

      html = html.replace('<head>', `<head>\n<meta http-equiv="Content-Security-Policy" content="${csp}">`);
      return html;
    }

    return `<!DOCTYPE html>
<html><body style="padding:20px;color:var(--vscode-foreground);">
<p>Run <code>npm run build:webview</code> to build the picker.</p>
</body></html>`;
  }
}
