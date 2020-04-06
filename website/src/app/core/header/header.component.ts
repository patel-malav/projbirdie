import { Component, OnInit } from "@angular/core";

@Component({
  selector: "pb-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  navOpen = false;
  title = `ProjBirdie`;
  routes = ["explore", "contribute", "account", "login", "register"];

  constructor() {}

  ngOnInit(): void {}

  toggleNav() {
    this.navOpen = !this.navOpen;
  }
}
