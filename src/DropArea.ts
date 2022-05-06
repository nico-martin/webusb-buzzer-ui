class DropArea {
  element: HTMLDivElement = null;

  constructor(element: HTMLDivElement, callback: (file: File) => void) {
    this.element = element;
    this.setEventListener(callback);
    this.setupInput(callback);
  }

  private setEventListener(callback: (file: File) => void) {
    this.element.addEventListener('dragenter', DropArea.onDragEnter);
    this.element.addEventListener('dragleave', DropArea.onDragLeave);
    this.element.addEventListener('dragover', DropArea.onDragOver);
    this.element.addEventListener('drop', (e) => DropArea.onDrop(e, callback));
    this.element.setAttribute('data-focus', 'false');
  }

  private setupInput(callback) {
    const input: HTMLInputElement = document.createElement('input');
    input.type = 'file';
    input.style.display = 'none';
    this.element.append(input);
    this.element.addEventListener('click', () => input.click());
    input.addEventListener('change', (ev) =>
      callback((ev.target as HTMLInputElement).files[0])
    );
  }

  private static onDragEnter(e) {
    e.target.setAttribute('data-focus', 'true');
  }

  private static onDragLeave(e) {
    e.target.setAttribute('data-focus', 'false');
  }

  private static onDragOver(e) {
    e.preventDefault();
  }

  private static onDrop(e, callback) {
    e.preventDefault();
    e.target.setAttribute('data-focus', 'false');
    const dt = e.dataTransfer;
    const files = dt.files;
    callback(files[0]);
  }
}

export default DropArea;
