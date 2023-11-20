export function getBuffer() {
  const data = '{"data":{"user":{"id":1,"name":"Hitman","level":10}}}';
  return (input => {
    const buffer = new ArrayBuffer(data.length * 2);
    const bufferView = new Uint16Array(buffer);
    for (let i = 0; i < input.length; i++) {
      bufferView[i] = input.charCodeAt(i);
    }
    return buffer;
  })(data);
}

export class ArrayBufferConverter {
  constructor() {
    this.bufferView = null;
  }

  load(buffer) {
    this.bufferView = new Uint16Array(buffer);
  }

  toString() {
    if (!this.bufferView) {
      throw new Error('Буфер не загружен!');
    }

    let result = '';

    for (let i = 0; i < this.bufferView.length; i++) {
      result += String.fromCharCode(this.bufferView[i]);
    }

    return result;
  }
}

// const converter = new ArrayBufferConverter();
// const bufferData = getBuffer();
// console.log('Обратите внимание bufferData: ', bufferData);

// converter.load(bufferData);
// console.log('Данные после Uint16Array: ', converter.bufferView);

// const convertedData = converter.toString();
// console.log('Итоговые данные после .toString(): ', convertedData);
