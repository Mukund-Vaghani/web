import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private router: Router, private http: HttpClient) { }

  webUserContact(body: any) {
    return this.http.post('https://skosh.app:8141/api/v1/admin/webUserContact', body, { 'headers': { 'api-key': 'U2FsdGVkX19Tk3q3t58uLeuYWNy2WjozTMfxBzGTrBc=', 'Content-Type': 'text/plain', 'Accept-Language':'en' } });
  }

}
