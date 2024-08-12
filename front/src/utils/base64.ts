export async function FileToBase64(
  file: File,
): Promise<string | ArrayBuffer | null> {
  var reader = new FileReader();

  reader.readAsDataURL(file);

  return new Promise((res, rej) => {
    reader.onload = function () {
      res(reader.result);
    };
    reader.onerror = function (error) {
      rej(error);
    };
  });
}
