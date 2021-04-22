/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';

import Game from './Game';
import '../assets/styles/League.css';

export default class League extends PureComponent {
  render() {
    const {
      league: {
        matches, competitionId, competitionName,
        competitionCountry, crest, rand
      }
    } = this.props;
    const games = matches
      .sort((a, b) => {
        const dateDiff = new Date(a.fixture.date) - new Date(b.fixture.date);
        if (dateDiff === 0) {
          return a.fixture.id - b.fixture.id;
        } else {
          return dateDiff;
        }
      })
      .map((match) => (
        <Game key={match.fixture.id} matchDetails={match} />
      ));
    return (
      <div className="league" id={competitionId} data-rand={rand}>
        <div className="league-header">
          <span className="league-name">
            {crest ? <img src={crest} alt={competitionCountry} /> : `${competitionCountry}: `}
            {competitionName}
          </span>
        </div>
        {games}
      </div>
    );
  }
}
