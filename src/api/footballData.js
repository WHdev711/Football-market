import axios from 'axios';

export const fetchMatches = async (date = null) => {
  // const theDate = new Date(date);
  // const today = new Date();
  // if (today.setHours(0, 0, 0, 0) === theDate.setHours(0, 0, 0, 0) || date === null) {
  //   const config = {
  //     method: 'get',
  //     url: 'https://v3.football.api-sports.io/fixtures',
  //     params: {
  //       live: 'all'
  //       // date: '2021-04-19'
  //     },
  //     headers: {
  //       'x-rapidapi-key': '44382238aff6fdbf79b600aa8f5ec5e4',
  //       'x-rapidapi-host': 'v3.football.api-sports.io'
  //     }
  //   };
  //   return axios(config)
  //     .then((res) => res, (err) => err.response);
  // } else {
  //   console.log(date);
  //   const config = {
  //     method: 'get',
  //     url: 'https://v3.football.api-sports.io/fixtures',
  //     params: {
  //       // live: 'all'
  //       date: date
  //     },
  //     headers: {
  //       'x-rapidapi-key': '44382238aff6fdbf79b600aa8f5ec5e4',
  //       'x-rapidapi-host': 'v3.football.api-sports.io'
  //     }
  //   };
  //   return axios(config)
  //     .then((res) => res, (err) => err.response);
  // }
  const config = {
    method: 'get',
    url: 'https://jsonstorage.net/api/items/ab01fb97-46c2-4046-9283-cc7468f57a1c'
  };
  return axios(config)
    .then((res) => res, (err) => err.response);
};

export const fetLeagueTable = async (leagueId) => {
  const options = {
    url: `${process.env.REACT_APP_API_BASE_URL}/competitions/${leagueId}/standings`,
    headers: { 'X-Auth-Token': process.env.REACT_APP_API_TOKEN }
  };
  return axios(options)
    .then((res) => res, (err) => err.response);
};
