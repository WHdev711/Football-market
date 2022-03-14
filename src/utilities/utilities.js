const appendLeadZero = (val) => (Number(val) > 9 ? val : `0${val}`);

const DAYS = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'April',
  'May', 'June', 'July', 'Aug',
  'Sept', 'Oct', 'Nov', 'Dec'
];

export const countryflag = (country) => {
  switch (country) {
  case 'Mexico': return 'https://media.api-sports.io/flags/mx.svg';
  case 'Brazil': return 'https://media.api-sports.io/flags/br.svg';
  case 'Ecuador': return 'https://media.api-sports.io/flags/ec.svg';
  case 'Colombia': return 'https://media.api-sports.io/flags/co.svg';
  case 'Chile': return 'https://media.api-sports.io/flags/cl.svg';
  case 'Uruguay': return 'https://media.api-sports.io/flags/uy.svg';
  case 'China': return 'https://media.api-sports.io/flags/cn.svg';
  default: return false;
  }
};

export const countryfilter = (country) => {
  switch (country) {
  case 'Mexico': return true;
  case 'Brazil': return true;
  case 'Ecuador': return true;
  case 'Colombia': return true;
  case 'Chile': return true;
  case 'Uruguay': return true;
  case 'China': return true;
  default: return false;
  }
};

export const formatStatus = (status) => {
  switch (status.long) {
  case 'SCHEDULED': return '';
  case 'Not Started': return ' Not Started';
  case 'Match Finished': return ' Finished';
  case 'Halftime': return ' Half-time';
  case 'Second Half': return ' Second-Half';
  case 'First Half': return ' First-Half';
  case 'Match Cancelled': return ' Cancelled';
  case 'Match Suspended': return ' Suspended';
  case 'Match Postponed': return ' Postponed';
  default: return 'Invalid';
  }
};

export const eventfilter = (filter) => {
  switch (filter.detail) {
  case 'Normal Goal': return 'Goal';
  case 'Own Goal': return 'Goal';
  case 'Penalty': return 'Penalty';
  case 'Missed Penalty': return 'Missed Penalty';
  case 'Yellow Card': return 'Yellow Card';
  case 'Second Yellow card': return 'Red Card(second yellow)';
  case 'Red card': return 'Red card';
  case 'Substitution 1': return 'Interchange';
  case 'Substitution 2': return 'Interchange';
  case 'Substitution 3': return 'Interchange';
  case 'Substitution 4': return 'Interchange';
  case 'Substitution 5': return 'Interchange';
  default: return 'Invalid';
  }
};

export const eventplayerfilter = (filter) => {
  switch (filter.detail) {
  case 'Normal Goal': return filter.player.name;
  case 'Own Goal': return filter.player.name;
  case 'Penalty': return filter.player.name;
  case 'Missed Penalty': return filter.player.name;
  case 'Yellow Card': return filter.player.name;
  case 'Second Yellow card': return filter.player.name;
  case 'Red card': return filter.player.name;
  case 'Substitution 1': return `${filter.player.name} (In)`;
  case 'Substitution 2': return `${filter.player.name} (In)`;
  case 'Substitution 3': return `${filter.player.name} (In)`;
  case 'Substitution 4': return `${filter.player.name} (In)`;
  case 'Substitution 5': return `${filter.player.name} (In)`;
  default: return ' ';
  }
};

export const eventassistfilter = (filter) => {
  switch (filter.detail) {
  case 'Normal Goal': return filter.assist.name === null ? ' ' : `${filter.assist.name} (assist)`;
  case 'Substitution 1': return `${filter.assist.name} (Out)`;
  case 'Substitution 2': return `${filter.assist.name} (Out)`;
  case 'Substitution 3': return `${filter.assist.name} (Out)`;
  case 'Substitution 4': return `${filter.assist.name} (Out)`;
  case 'Substitution 5': return `${filter.assist.name} (Out)`;
  default: return ' ';
  }
};

export const genRandomString = () => {
  const charSet =
    '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()';
  const captchaLen = 4;
  const captcha = [];
  for (let i = 0; i < captchaLen; i += 1) {
    const index = Math.floor(Math.random() * charSet.length + 1);
    if (captcha.indexOf(charSet[index]) === -1) {
      captcha.push(charSet[index]);
    } else {
      i -= 1;
    }
  }
  return captcha.join('');
};

export const rearrangeMatches = (matches) => {
  const leagues = [];
  console.log(matches);


  // enter the various leagues/competitions into the new array
  for (let i = 0; i < matches.results; i++) {
    console.log(matches.response[i].league.country);
    if (countryfilter(matches.response[i].league.country)) {
      leagues.push({
        competitionId: matches.response[i].league.id,
        competitionName: matches.response[i].league.name,
        competitionCountry: matches.response[i].league.country,
        crest: countryflag(matches.response[i].league.country)
      });
    }
  }
  // enter the matches into their respective leagues
  for (let i = 0; i < leagues.length; i++) {
    const matchGroup = matches.response.filter(
      (match) => leagues[i].competitionId === match.league.id
    );
    leagues[i].matches = matchGroup;
  }
  return { count: leagues.length, leagues };
};

export const formatScore = (score) => {
  let { home, away } = score;
  return home === null ? '_' : `${home} - ${away}`;
};

/**
 * recieve a date-time string and return date
 * @param {String} dateString
 * @returns {String} Format: Tues, 24 Sept 2019
 */
export const getGameDay = (dateString) => {
  const date = new Date(dateString);

  return `${DAYS[date.getDay()]},
    ${appendLeadZero(date.getDate())} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
};

export const getCurrentDateTime = (dateObj) => {
  const date = dateObj;
  return `${DAYS[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]}.
  ${date.toLocaleString([], { hour: 'numeric', minute: '2-digit', second: '2-digit' })}`;
};

/**
 * recieve a date-time string and return time
 * @param {String} dateString
 * @returns {String} Format: 12:33PM
 */
export const getGameTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString([], {
    hour: 'numeric',
    minute: '2-digit'
  });
};

/**
 * recieve day count from today and return the date of that day
 * @param {Integer} dayCount
 * @returns {String} Format: 23/09
 */
export const getDayFromToday = (dayCount) => {
  const A_DAY = 86400000; // 1000mills * 60s * 60m * 24hr;
  const day = new Date(new Date().getTime() + A_DAY * dayCount);
  return `${appendLeadZero(day.getDate())} /
    ${appendLeadZero(day.getMonth() + 1)}`;
};

/**
 * recieve day count from today in milliseconds and return the date of that day
 * @param {Integer} millis
 * @returns {String} Format: 2019-07-21
 */
export const getDateFromToday = (millis) => {
  const day = new Date(new Date().getTime() + millis);
  return `${day.getFullYear()}-${appendLeadZero(day.getMonth() + 1)}-${appendLeadZero(day.getDate())}`;
};

/**
 * receive a date object and format it into the format that is used by the football api
 * @param {Date} dateObject
 * @returns {String} Format: 2019-07-21
 */
export const formatDateForUrl = (dateObject) => {
  const day = new Date(dateObject);

  return `${day.getFullYear()}-${appendLeadZero(day.getMonth() + 1)}-${appendLeadZero(day.getDate())}`;
};

/**
 * recieve a date value and return true if the date is today. Otherwise, false.
 * @param {String} date
 * @returns {Boolean}
 */
export const isToday = (date) => {
  const theDate = new Date(date);
  const today = new Date();
  return today.setHours(0, 0, 0, 0) === theDate.setHours(0, 0, 0, 0);
};
