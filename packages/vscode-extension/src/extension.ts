import * as vscode from 'vscode';
import { IconPickerPanel } from './IconPickerPanel';

/**
 * Called when the extension is activated
 */
export function activate(context: vscode.ExtensionContext): void {
  console.log('MotionIcons Picker extension is now active');

  // Register the open picker command
  const openPickerCommand = vscode.commands.registerCommand(
    'motionicon.openPicker',
    () => {
      IconPickerPanel.createOrShow(context.extensionUri, context);
    }
  );

  context.subscriptions.push(openPickerCommand);

  // Register view serializer for webview persistence
  if (vscode.window.registerWebviewPanelSerializer) {
    vscode.window.registerWebviewPanelSerializer(IconPickerPanel.viewType, {
      async deserializeWebviewPanel(
        webviewPanel: vscode.WebviewPanel,
        _state: unknown
      ) {
        IconPickerPanel.revive(webviewPanel, context.extensionUri, context);
      },
    });
  }
}

/**
 * Called when the extension is deactivated
 */
export function deactivate(): void {
  console.log('MotionIcons Picker extension is now deactivated');
}
