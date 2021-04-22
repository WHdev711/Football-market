/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';

import '../assets/styles/Game.css';

import {
  getGameTime, formatScore, formatStatus, eventfilter, eventassistfilter, eventplayerfilter
} from '../utilities/utilities';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreColor: '#219653'
    };
  }

  componentDidUpdate(prevProps) {
    const { matchDetails: { goals: { home, away } } } = this.props;
    const { matchDetails: { goals } } = prevProps;
    if (goals.home !== home || goals.away !== away) {
      this.setState({
        scoreColor: '#E78000'
      });
      setTimeout(() => this.setState({
        scoreColor: '#219653'
      }), 20000);
    }
  }

  render() {
    const {
      matchDetails: {
        fixture, teams, goals, events
      }
    } = this.props;
    const { scoreColor } = this.state;
    var homeGameEvents = null;
    var awayGameEvents = null;
    if (events) {
      homeGameEvents = events
        .sort((a, b) => a.time.elapsed - b.time.elapsed)
        .map((event) => (
          event.team.name === teams.home.name ? (
            <div>
              {event.time.elapsed}
              &apos;
              &nbsp;
              {eventfilter(event)}
              &nbsp;
              &nbsp;
              &nbsp;
              {eventplayerfilter(event)}
              &nbsp;
              &nbsp;
              &nbsp;
              {eventassistfilter(event)}
            </div>
          ) : null
        ));
      awayGameEvents = events
        .sort((a, b) => a.time.elapsed - b.time.elapsed)
        .map((event) => (
          event.team.name === teams.away.name ? (
            <div>
              {event.time.elapsed}
              &apos;
              &nbsp;
              {eventfilter(event)}
              &nbsp;
              &nbsp;
              &nbsp;
              {eventplayerfilter(event)}
              &nbsp;
              &nbsp;
              &nbsp;
              {eventassistfilter(event)}
            </div>
          ) : null
        ));
    }
    let style;
    if (fixture.status.long === 'Halftime' || fixture.status.long === 'Second Half') style = { background: '#04E044' };
    else if (fixture.status === 'Match Suspended') style = { background: '#E78000' };
    else if (fixture.status === 'Match Finished') style = { background: '#717371' };
    else if (fixture.status === 'Match Cancelled') style = { background: '#C83232' };
    else style = { background: '#969121' };
    return (
      <div className="game">
        <div className="game-time" style={style}>
          {`${getGameTime(fixture.date)} ${formatStatus(fixture.status)}`}
        </div>
        <div className="teams-score">
          <div className="home-team inline-b">{teams.home.name}</div>
          <div className="score inline-b" style={{ background: scoreColor }}>
            {formatScore(goals)}
          </div>
          <div className="away-team inline-b">{teams.away.name}</div>
        </div>
        <div className="teams-events" style={{ background: scoreColor }}>
          <div className="home-team game-events inline-b" style={{ background: scoreColor }}>{homeGameEvents}</div>
          <div className="away-team game-events inline-b" style={{ background: scoreColor }}>{awayGameEvents}</div>
        </div>
      </div>
    );
  }
}
