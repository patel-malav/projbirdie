import { Component, OnInit } from "@angular/core";
import { EngineService } from 'src/app/explore/engine/engine.service';
import { Observable } from "rxjs";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { map } from "rxjs/operators";

@Component({
  selector: "pb-side",
  templateUrl: "./side.component.html",
  styleUrls: ["./side.component.scss"]
})
export class SideComponent implements OnInit {
  public term: string;
  public case: string;
  public search$: Observable<any>;
  public observation$: Observable<any>;
  public taxanomy$: Observable<any>;

  constructor(private apollo: Apollo, private engServ: EngineService) {}

  ngOnInit(): void {}

  /**
   * Search a term for auto complete
   * @param value string to search
   */
  search(value: string) {
    this.case = "search";
    this.search$ = this.apollo
      .query<any>({
        query: gql`{search(term: "${value}"){taxaId name {common sci} image}}`
      })
      .pipe(map(resp => resp.data.search));
  }

  /**
   * Get Taxanomy of TaxaId Provided
   * @param id Id to search
   */
  taxanomy(id: string) {
    this.case = "taxanomy";
    this.taxanomy$ = this.apollo
      .query<any>({
        query: gql`{taxanomy(id:${id}){id name{common sci}image{id medium}}}`
      })
      .pipe(map(resp => resp.data.taxanomy));
    // this.apollo
    // .query<any>({query: gql`{}`})
  }

  /**
   * Show Observation for the corresponding TaxaId
   * @param id TaxaId for which observations to show
   */

  displayObservations(taxaId: string) {
    // this.canvasServ.clear$.next('all');
    let observations: { id: string; geo: { lat: string; long: string } }[];
    this.apollo
      .query<any>({
        query: gql`{observations(taxaId:${taxaId}){id geo{lat long}}}`
      })
      .subscribe(resp => {
        observations = resp.data.observations;
        for (let obs of observations) {
          let lat = parseFloat(obs.geo.lat),
            long = parseFloat(obs.geo.long);
          this.engServ.showBird({id: obs.id, geo:{lat, long}});
          // this.canvasServ.observation$.next({ lat, long });
        }
      });
  }

  /**
   * Display Data about an Observation.
   * @param id Observation ID to show
   */
  observation(id: string) {
    this.observation$ = this.apollo
      .query<any>({
        query: gql`{observation(id:${id}){id user{id name}geo{lat long}images{id medium}}}`
      })
      .pipe(map(resp => resp.data.observation));
    // this.canvasServ.showObservation(id);
  }
}
