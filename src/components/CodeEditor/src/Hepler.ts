import { MODE } from './typing';

const modes = new Map<string, MODE>();
modes.set('java', MODE.JAVA);
modes.set('xml', MODE.XML);

export function getCodeEditorMode(filename: string): MODE {
  return modes.get(filename.substring(filename.lastIndexOf('.') + 1)) || MODE.HTML;
}
