export async function getBase64Url(data: Blob) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(data);

    reader.onloadend = function () {
      let base64String = reader.result as string;
      let base64Url = base64String.split(',')[1];
      resolve(base64Url);
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
}
