import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Directive({
  selector: '[downloadFile]',
})
export class DownloadFileDirective {
  constructor(private readonly httpClient: HttpClient) {}

  private downloadUrl: string = '';

  @Input('downloadFile')
  public set url(url: string) {
    this.downloadUrl = url;
  }

  @HostListener('click')
  public async onClick(): Promise<void> {
    document.querySelector('#excel-download')?.setAttribute('disabled', '');
    const response = await this.httpClient
      .get(this.downloadUrl, { responseType: 'blob', observe: 'response' })
      .toPromise();

    const url = URL.createObjectURL(response!.body!);

    const anchor = document.createElement('a');
    anchor.href = url;

    anchor.download =
      DownloadFileDirective.getFilenameFromHeaders(response!.headers) || 'file';

    anchor.click();

    URL.revokeObjectURL(url);
    document.querySelector('#excel-download')?.removeAttribute('disabled');
  }

  private static getFilenameFromHeaders(headers: HttpHeaders) {
    const contentDisposition = headers.get('Content-Disposition');
    if (!contentDisposition) {
      return null;
    }
    return contentDisposition
      .split(';')[2]
      .replace('filename*=', '')
      .replace('UTF-8', '')
      .replace(new RegExp("'", 'g'), '')
      .trim();
  }
}
