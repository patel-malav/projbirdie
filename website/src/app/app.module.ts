import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { ExploreModule } from './explore/explore.module';
import { AccountModule } from './account/account.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './graphql.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    HttpClientModule,
    AppRoutingModule,
    GraphQLModule,
    SharedModule.forRoot(),
    CoreModule,
    ExploreModule,
    AccountModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
