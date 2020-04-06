import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

interface Fields {
  term: string;
  filter: string;
}

@Component({
  selector: "pb-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  filter: string;
  term: string;

  constructor(public router: Router) {}

  ngOnInit(): void {
    let segments = this.router.url.split("/");
    this.filter = segments[2] ? segments[2] : "aves";
    this.term = segments[3] ? segments[3] : "";
  }
  search({ term, filter }: Fields): void {
    // console.log(filter, term);
    term = term.toLowerCase();
    this.router.navigate(["explore", filter, term]);
  }
}