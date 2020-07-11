export function checkStatus(response: Response): void {
  if (response.status >= 200 && response.status < 300) {
    return;
  } else {
    const error: Error & { response: Response } = Object.assign(
      new Error(response.statusText),
      { response }
    );

    throw error;
  }
}
