import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-excell-download',
  template: `
    <button
      nz-button
      nz-dropdown
      [nzDropdownMenu]="menu"
      [nzPlacement]="'bottomLeft'"
      id="excel-download"
    >
      <nz-spin nzSimple [nzSize]="'small'"></nz-spin>
      Excel yüklə
      <span nz-icon nzType="down"></span>
    </button>
    <nz-dropdown-menu #menu="nzDropdownMenu">
      <ul nz-menu>
        <li nz-menu-item [downloadFile]="reportLink">Cari</li>
        <li nz-menu-item [downloadFile]="downloadAll(reportLink)">Hamısı</li>
      </ul>
    </nz-dropdown-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      nz-spin {
        display: none;
      }
      button:disabled {
        nz-spin {
          display: inline-block;
          margin-right: 10px;
        }
      }
    `,
  ],
})
export class ExcellDownloadComponent {
  @Input() reportLink: string = '';

  downloadAll(url: string) {
    const params = new URLSearchParams(new URL(url).search);
    const pageId = params.get('pageId');
    const pageIdQuery = pageId ? `&pageId=${pageId || 0}` : '';
    return url.split('?')[0] + '?limit=1000000' + pageIdQuery;
  }
}
