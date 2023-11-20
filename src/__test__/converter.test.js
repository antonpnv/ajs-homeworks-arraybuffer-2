import { getBuffer } from '../js/arrBufConverter';
import { ArrayBufferConverter } from '../js/arrBufConverter';

test('getBuffer должен возвращать ArrayBuffer с правильными данными', () => {
  const expectedData = '{"data":{"user":{"id":1,"name":"Hitman","level":10}}}';
  const buffer = getBuffer();
  const bufferView = new Uint16Array(buffer);
  let result = '';
  for (let i = 0; i < bufferView.length; i++) {
    result += String.fromCharCode(bufferView[i]);
  }
  expect(result).toBe(expectedData);
});

test('getBuffer должен создавать буфер правильной длины', () => {
  const expectedLength = '{"data":{"user":{"id":1,"name":"Hitman","level":10}}}'.length * 2;
  const buffer = getBuffer();
  const bufferLength = buffer.byteLength;
  expect(bufferLength).toBe(expectedLength);
});

test('load должен корректно устанавливать bufferView', () => {
  const converter = new ArrayBufferConverter();
  const bufferData = new Uint16Array([72, 101, 108, 108, 111]); // 'Hello'
  converter.load(bufferData.buffer);

  expect(converter.bufferView).toEqual(bufferData);
});

test('toString должен конвертировать bufferView в строку', () => {
  const converter = new ArrayBufferConverter();
  const bufferData = new Uint16Array([72, 101, 108, 108, 111]); // 'Hello'
  converter.load(bufferData.buffer);

  expect(converter.toString()).toBe('Hello');
});

test('toString должен выбрасывать ошибку, если буфер не загружен', () => {
  const converter = new ArrayBufferConverter();

  expect(() => {
    converter.toString();
  }).toThrow('Буфер не загружен!');
});