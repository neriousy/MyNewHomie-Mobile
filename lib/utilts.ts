// Plik z funkcjami pomocniczymi

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

export function convertToDate(
  year: number,
  month: number,
  day: number,
  hours: number,
  minutes: number,
  seconds: number,
  milliseconds: number
) {
  return new Date(year, month - 1, day, hours, minutes, seconds, 0);
}
