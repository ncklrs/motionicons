import * as vscode from 'vscode';
import { IconPickerViewProvider } from './IconPickerViewProvider';

/**
 * Called when the extension is activated
 */
export function activate(context: vscode.ExtensionContext): void {
  console.log('MotionIcons Picker extension is now active');

  // Register the sidebar webview provider
  const provider = new IconPickerViewProvider(context.extensionUri, context);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      IconPickerViewProvider.viewType,
      provider
    )
  );
}

/**
 * Called when the extension is deactivated
 */
export function deactivate(): void {
  console.log('MotionIcons Picker extension is now deactivated');
}
