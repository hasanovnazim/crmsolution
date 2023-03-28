import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ApiService } from '../../store/api.service';

@Injectable()
export class ExcelDownloadService {
  constructor(private api: ApiService) {}
  downloadReport(
    endpoint: string,
    params: Observable<any>
  ): Observable<string> {
    let url = `${this.api.baseUrl}/api/${this.api.apiVersion}/${endpoint}?`;

    return params.pipe(
      map((params) => {
        let newparams = { ...params };
        if (!newparams.pageId) {
          delete newparams.pageId;
        }
        let httpParams = new HttpParams({ fromObject: newparams });
        return url + httpParams.toString();
      })
    );
  }
}
