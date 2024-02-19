interface RcFile extends File {
  readonly lastModifiedDate?: Date;
  uid?: string;
}


export const getBase64 = (file: RcFile | undefined): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file as RcFile);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  })
}


export function insertAtCaret(e, valueToInsert) {
  const target = e.target;

  const start = target.selectionStart;
  const end = target.selectionEnd;
  const newValue =
    target.value.slice(0, start) + valueToInsert + target.value.slice(end);

  e.target.value = newValue;
  e.target.selectionStart = start + 1;
  e.target.selectionEnd = end + 1;

  const lineHeight = parseInt(getComputedStyle(target).lineHeight);
  const linesCount = newValue.substring(0, start + 1).split('\n').length;
  const newLineTop = linesCount * lineHeight;
  const visibleBottom = target.scrollTop + target.clientHeight;

  if (newLineTop > visibleBottom) {
    e.target.scrollTop = newLineTop - target.clientHeight;
  }

  return e;
}
