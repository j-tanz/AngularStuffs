// x.component.ts
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

export class ListComponent implements OnInit, AfterViewInit, OnDestroy {

  ngOnInit() {
    console.log("on init");
  }
  ngAfterViewInit() {
    console.log("after view init");
  }
  ngOnDestroy() {
    console.log("on destroy")
  }
}