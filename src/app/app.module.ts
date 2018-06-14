import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {RouterModule, Routes} from "@angular/router";

import { AppComponent } from "./components/app.component";
import { CharacterCreationComponent } from "./components/character-creation/character-creation.component";
import { FightComponent } from "./components/fight/fight.component";
import { InventoryComponent } from "./components/inventory/inventory.component";
import { StartComponent } from "./components/start/start.component";
import { StoryComponent } from "./components/story/story.component";

const routes: Routes = [
  {path: "", component: StartComponent},
  {path: "story", component: StoryComponent},
  {path: "character-creation", component: CharacterCreationComponent},
  {path: "fight", component: FightComponent},
  {path: "**", redirectTo: ""},
];

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    StoryComponent,
    CharacterCreationComponent,
    FightComponent,
    InventoryComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
