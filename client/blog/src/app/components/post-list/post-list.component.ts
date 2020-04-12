import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { QueryRef, Apollo } from 'apollo-angular';

const PLAYERS_QUERY = gql`
  query posts {
    posts{
      id,
      text,
      autor
    }
  }
`;

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.less']
})


export class PostListComponent implements OnInit {

  page = 1;
  players: any[] = [];

  private query: QueryRef<any>;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.query = this.apollo.watchQuery({
      query: PLAYERS_QUERY,
      variables: {}
    });

    this.query.valueChanges.subscribe(result => {
      this.players = result.data && result.data.posts;
    });
  }

  update() {
    this.query.refetch({ offset: 10 * this.page });
  }

  nextPage() {
    this.page++;
    this.update();
  }

  prevPage() {
    if (this.page > 0) this.page--;
    this.update();
  }

}
