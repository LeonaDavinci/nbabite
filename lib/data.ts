import { Team, Player, Game, Article } from "./types";

export const SITE = {
  name: "NBABite",
  domain: "https://www.nbabite.org",
  tagline: "Your daily home for NBA scores, schedules, teams, stars & where to watch",
  description:
    "NBABite is an independent NBA fan hub covering every team, the full game schedule, player stats for LeBron James, Stephen Curry, Victor Wembanyama and more, plus the legal ways to watch NBA basketball.",
};

export const TEAMS: Team[] = [
  // ---------- Eastern Conference ----------
  { id: "atl", slug: "hawks", name: "Atlanta Hawks", shortName: "ATL", city: "Atlanta", state: "Georgia", conference: "Eastern", division: "Southeast", founded: 1949, arena: "State Farm Arena", championships: 1, primaryColor: "#E03A3E", secondaryColor: "#C1D32F", description: "The Atlanta Hawks are a Southeast Division franchise best known for high-octane offense and a passionate home crowd at State Farm Arena." },
  { id: "bos", slug: "celtics", name: "Boston Celtics", shortName: "BOS", city: "Boston", state: "Massachusetts", conference: "Eastern", division: "Atlantic", founded: 1946, arena: "TD Garden", championships: 18, primaryColor: "#007A33", secondaryColor: "#BA9653", description: "The Boston Celtics are the NBA's most decorated franchise with 18 championships, led historically by Bill Russell and Larry Bird and today by a deep, modern roster." },
  { id: "bkn", slug: "nets", name: "Brooklyn Nets", shortName: "BKN", city: "Brooklyn", state: "New York", conference: "Eastern", division: "Atlantic", founded: 1967, arena: "Barclays Center", championships: 0, primaryColor: "#000000", secondaryColor: "#FFFFFF", description: "The Brooklyn Nets play in the heart of New York City at Barclays Center and have built a young, athletic core chasing the franchise's first title." },
  { id: "cha", slug: "hornets", name: "Charlotte Hornets", shortName: "CHA", city: "Charlotte", state: "North Carolina", conference: "Eastern", division: "Southeast", founded: 1988, arena: "Spectrum Center", championships: 0, primaryColor: "#1D1160", secondaryColor: "#00788C", description: "The Charlotte Hornets, founded by Michael Jordan's era of ownership, are a Southeast Division team developing a fast, guard-driven identity." },
  { id: "chi", slug: "bulls", name: "Chicago Bulls", shortName: "CHI", city: "Chicago", state: "Illinois", conference: "Eastern", division: "Central", founded: 1966, arena: "United Center", championships: 6, primaryColor: "#CE1141", secondaryColor: "#000000", description: "The Chicago Bulls rose to global fame with Michael Jordan and six titles in the 1990s and remain one of the league's most recognizable brands." },
  { id: "cle", slug: "cavaliers", name: "Cleveland Cavaliers", shortName: "CLE", city: "Cleveland", state: "Ohio", conference: "Eastern", division: "Central", founded: 1970, arena: "Rocket Mortgage FieldHouse", championships: 1, primaryColor: "#860038", secondaryColor: "#FDBB30", description: "The Cleveland Cavaliers won their lone championship in 2016 and now build around an explosive backcourt in the Central Division." },
  { id: "dal", slug: "mavericks", name: "Dallas Mavericks", shortName: "DAL", city: "Dallas", state: "Texas", conference: "Western", division: "Southwest", founded: 1980, arena: "American Airlines Center", championships: 1, primaryColor: "#00538C", secondaryColor: "#002B5E", description: "The Dallas Mavericks, 2011 champions, pair elite shot-creation with size and spacing in the competitive Southwest Division." },
  { id: "den", slug: "nuggets", name: "Denver Nuggets", shortName: "DEN", city: "Denver", state: "Colorado", conference: "Western", division: "Northwest", founded: 1967, arena: "Ball Arena", championships: 1, primaryColor: "#0E2240", secondaryColor: "#FEC524", description: "The Denver Nuggets captured their first championship in 2023 and are built around a historically efficient offense led from the top." },
  { id: "det", slug: "pistons", name: "Detroit Pistons", shortName: "DET", city: "Detroit", state: "Michigan", conference: "Eastern", division: "Central", founded: 1948, arena: "Little Caesars Arena", championships: 3, primaryColor: "#C8102E", secondaryColor: "#1D42BA", description: "The Detroit Pistons are a three-time champion franchise known for 'Bad Boys' toughness, now rebuilding with youthful energy." },
  { id: "gsw", slug: "warriors", name: "Golden State Warriors", shortName: "GSW", city: "San Francisco", state: "California", conference: "Western", division: "Pacific", founded: 1946, arena: "Chase Center", championships: 7, primaryColor: "#1D428A", secondaryColor: "#FFC72C", description: "The Golden State Warriors revolutionized basketball with a dynasty built on elite shooting and ball movement, winning seven titles." },
  { id: "hou", slug: "rockets", name: "Houston Rockets", shortName: "HOU", city: "Houston", state: "Texas", conference: "Western", division: "Southwest", founded: 1967, arena: "Toyota Center", championships: 2, primaryColor: "#CE1141", secondaryColor: "#000000", description: "The Houston Rockets, two-time champions, are assembling a young, athletic roster built around versatile forwards in the Southwest." },
  { id: "ind", slug: "pacers", name: "Indiana Pacers", shortName: "IND", city: "Indianapolis", state: "Indiana", conference: "Eastern", division: "Central", founded: 1967, arena: "Gainbridge Fieldhouse", championships: 0, primaryColor: "#002D62", secondaryColor: "#FDBB30", description: "The Indiana Pacers play an up-tempo, free-flowing style at Gainbridge Fieldhouse and are a rising force in the Central Division." },
  { id: "lac", slug: "clippers", name: "LA Clippers", shortName: "LAC", city: "Los Angeles", state: "California", conference: "Western", division: "Pacific", founded: 1970, arena: "Intuit Dome", championships: 0, primaryColor: "#1D428A", secondaryColor: "#C8102E", description: "The LA Clippers opened the Intuit Dome and pair star power with two-way wings as they chase the franchise's first championship." },
  { id: "lal", slug: "lakers", name: "Los Angeles Lakers", shortName: "LAL", city: "Los Angeles", state: "California", conference: "Western", division: "Pacific", founded: 1947, arena: "Crypto.com Arena", championships: 17, primaryColor: "#552583", secondaryColor: "#FDB927", description: "The Los Angeles Lakers are a 17-time champion franchise and one of the most famous sports brands in the world, with stars spanning Magic, Kobe and LeBron." },
  { id: "mem", slug: "grizzlies", name: "Memphis Grizzlies", shortName: "MEM", city: "Memphis", state: "Tennessee", conference: "Western", division: "Southwest", founded: 1995, arena: "FedExForum", championships: 0, primaryColor: "#5D76A9", secondaryColor: "#12173F", description: "The Memphis Grizzlies built a gritty, defensive identity and a young core that pushes the pace in the Southwest Division." },
  { id: "mia", slug: "heat", name: "Miami Heat", shortName: "MIA", city: "Miami", state: "Florida", conference: "Eastern", division: "Southeast", founded: 1988, arena: "Kaseya Center", championships: 3, primaryColor: "#98002E", secondaryColor: "#F9A01B", description: "The Miami Heat, three-time champions, are synonymous with culture and development, repeatedly maximizing talent under a proven system." },
  { id: "mil", slug: "bucks", name: "Milwaukee Bucks", shortName: "MIL", city: "Milwaukee", state: "Wisconsin", conference: "Eastern", division: "Central", founded: 1968, arena: "Fiserv Forum", championships: 2, primaryColor: "#00471B", secondaryColor: "#EEE1C6", description: "The Milwaukee Bucks won it all in 2021 and combine interior dominance with perimeter shooting in the Central Division." },
  { id: "min", slug: "timberwolves", name: "Minnesota Timberwolves", shortName: "MIN", city: "Minneapolis", state: "Minnesota", conference: "Western", division: "Northwest", founded: 1989, arena: "Target Center", championships: 0, primaryColor: "#0C2340", secondaryColor: "#236192", description: "The Minnesota Timberwolves are a ascending Northwest Division team built on elite two-way wings and rim protection." },
  { id: "nop", slug: "pelicans", name: "New Orleans Pelicans", shortName: "NOP", city: "New Orleans", state: "Louisiana", conference: "Western", division: "Southwest", founded: 2002, arena: "Smoothie King Center", championships: 0, primaryColor: "#0C2340", secondaryColor: "#C8102E", description: "The New Orleans Pelicans mix length and skill on the wing and are a versatile, switch-heavy outfit in the Southwest." },
  { id: "nyk", slug: "knicks", name: "New York Knicks", shortName: "NYK", city: "New York", state: "New York", conference: "Eastern", division: "Atlantic", founded: 1946, arena: "Madison Square Garden", championships: 2, primaryColor: "#006BB6", secondaryColor: "#F58426", description: "The New York Knicks play at iconic Madison Square Garden and have rebuilt a defense-first, physical identity in the Atlantic." },
  { id: "okc", slug: "thunder", name: "Oklahoma City Thunder", shortName: "OKC", city: "Oklahoma City", state: "Oklahoma", conference: "Western", division: "Northwest", founded: 1967, arena: "Paycom Center", championships: 1, primaryColor: "#007AC1", secondaryColor: "#EF3B24", description: "The Oklahoma City Thunder won their first title in 2025 and boast one of the league's deepest, youngest rosters." },
  { id: "orl", slug: "magic", name: "Orlando Magic", shortName: "ORL", city: "Orlando", state: "Florida", conference: "Eastern", division: "Southeast", founded: 1989, arena: "Kia Center", championships: 0, primaryColor: "#0077C0", secondaryColor: "#C4CED4", description: "The Orlando Magic lean on length, defense and athletic wings as a fast-rising Southeast Division contender." },
  { id: "phi", slug: "76ers", name: "Philadelphia 76ers", shortName: "PHI", city: "Philadelphia", state: "Pennsylvania", conference: "Eastern", division: "Atlantic", founded: 1946, arena: "Wells Fargo Center", championships: 3, primaryColor: "#006BB6", secondaryColor: "#ED174C", description: "The Philadelphia 76ers, three-time champions, blend size and shot-making and carry one of the league's proudest histories." },
  { id: "phx", slug: "suns", name: "Phoenix Suns", shortName: "PHX", city: "Phoenix", state: "Arizona", conference: "Western", division: "Pacific", founded: 1968, arena: "Footprint Center", championships: 0, primaryColor: "#1D1160", secondaryColor: "#E56020", description: "The Phoenix Suns play an offensive-minded, perimeter-driven game and remain a marquee franchise in the Pacific Division." },
  { id: "por", slug: "blazers", name: "Portland Trail Blazers", shortName: "POR", city: "Portland", state: "Oregon", conference: "Western", division: "Northwest", founded: 1970, arena: "Moda Center", championships: 1, primaryColor: "#E03A3E", secondaryColor: "#000000", description: "The Portland Trail Blazers, 1977 champions, are a loyal, raucous-fanbase team rebuilding around young guards in the Northwest." },
  { id: "sac", slug: "kings", name: "Sacramento Kings", shortName: "SAC", city: "Sacramento", state: "California", conference: "Western", division: "Pacific", founded: 1948, arena: "Golden 1 Center", championships: 1, primaryColor: "#5A2D81", secondaryColor: "#63727A", description: "The Sacramento Kings play an entertaining, pace-and-space style and own the longest-tenured fan base in the NBA." },
  { id: "sas", slug: "spurs", name: "San Antonio Spurs", shortName: "SAS", city: "San Antonio", state: "Texas", conference: "Western", division: "Southwest", founded: 1967, arena: "Frost Bank Center", championships: 5, primaryColor: "#C4CED4", secondaryColor: "#000000", description: "The San Antonio Spurs, five-time champions and a model of sustained excellence, are now headlined by a generational French prospect." },
  { id: "tor", slug: "raptors", name: "Toronto Raptors", shortName: "TOR", city: "Toronto", state: "Ontario", conference: "Eastern", division: "Atlantic", founded: 1995, arena: "Scotiabank Arena", championships: 1, primaryColor: "#CE1141", secondaryColor: "#000000", description: "The Toronto Raptors, Canada's only NBA team and 2019 champions, bring a global, defensive-minded identity to the Atlantic." },
  { id: "uta", slug: "jazz", name: "Utah Jazz", shortName: "UTA", city: "Salt Lake City", state: "Utah", conference: "Western", division: "Northwest", founded: 1974, arena: "Delta Center", championships: 0, primaryColor: "#002B5C", secondaryColor: "#F9A01B", description: "The Utah Jazz are a disciplined, well-run Northwest Division franchise developing a young core for the future." },
  { id: "was", slug: "wizards", name: "Washington Wizards", shortName: "WAS", city: "Washington", state: "District of Columbia", conference: "Eastern", division: "Southeast", founded: 1961, arena: "Capital One Arena", championships: 1, primaryColor: "#002B5C", secondaryColor: "#E31837", description: "The Washington Wizards, 1978 champions, are rebuilding around youth in the nation's capital in the Southeast Division." },
];

export const PLAYERS: Player[] = [
  { id: "lebron", slug: "lebron-james", name: "LeBron James", firstName: "LeBron", lastName: "James", teamSlug: "76ers", position: "Forward", jersey: 23, height: "6'9\"", weight: "250 lb", born: "1984-12-30", birthplace: "Akron, Ohio", draftYear: 2003, ppg: 25.0, rpg: 7.3, apg: 8.3, isStar: true, headshot: "/images/players/lebron-james.png", bio: "LeBron James is a four-time NBA champion and widely regarded as one of the greatest basketball players of all time. After a landmark move to the Philadelphia 76ers, he now pairs with Joel Embiid as the franchise chases another title, bringing elite playmaking and veteran leadership to the City of Brotherly Love." },
  { id: "curry", slug: "stephen-curry", name: "Stephen Curry", firstName: "Stephen", lastName: "Curry", teamSlug: "warriors", position: "Guard", jersey: 30, height: "6'2\"", weight: "185 lb", born: "1988-03-14", birthplace: "Akron, Ohio", draftYear: 2009, ppg: 26.4, rpg: 4.5, apg: 5.1, isStar: true, headshot: "/images/players/stephen-curry.png", bio: "Stephen Curry is the greatest shooter in NBA history and the engine of the Golden State Warriors dynasty. A two-time MVP and four-time champion, he reshaped the modern game with range and off-ball movement." },
  { id: "wemby", slug: "victor-wembanyama", name: "Victor Wembanyama", firstName: "Victor", lastName: "Wembanyama", teamSlug: "spurs", position: "Center", jersey: 1, height: "7'4\"", weight: "210 lb", born: "2004-01-04", birthplace: "Le Chesnay, France", draftYear: 2023, ppg: 21.4, rpg: 10.6, apg: 3.6, isStar: true, bio: "Victor Wembanyama is a generational prospect for the San Antonio Spurs, pairing unicorn skill at 7'4\" with elite rim protection and perimeter touch. The 2024 Rookie of the Year is the face of the franchise's next era." },
  { id: "jokic", slug: "nikola-jokic", name: "Nikola Jokic", firstName: "Nikola", lastName: "Jokic", teamSlug: "nuggets", position: "Center", jersey: 15, height: "6'11\"", weight: "284 lb", born: "1995-02-19", birthplace: "Sombor, Serbia", draftYear: 2014, ppg: 26.4, rpg: 12.4, apg: 9.0, isStar: true, bio: "Nikola Jokic is a three-time MVP and the hub of the Denver Nuggets' historic offense. The Serbian big man blends scoring, rebounding and elite playmaking from the post." },
  { id: "giannis", slug: "giannis-antetokounmpo", name: "Giannis Antetokounmpo", firstName: "Giannis", lastName: "Antetokounmpo", teamSlug: "bucks", position: "Forward", jersey: 34, height: "6'11\"", weight: "243 lb", born: "1994-12-06", birthplace: "Athens, Greece", draftYear: 2013, ppg: 30.4, rpg: 11.5, apg: 6.4, isStar: true, bio: "Giannis Antetokounmpo, the 'Greek Freak', is a two-time MVP and 2021 Finals MVP who powers the Milwaukee Bucks with relentless drives and defense." },
  { id: "luka", slug: "luka-doncic", name: "Luka Doncic", firstName: "Luka", lastName: "Doncic", teamSlug: "mavericks", position: "Guard", jersey: 77, height: "6'7\"", weight: "230 lb", born: "1999-02-28", birthplace: "Ljubljana, Slovenia", draftYear: 2018, ppg: 28.1, rpg: 8.3, apg: 7.8, isStar: true, bio: "Luka Doncic is a perennial MVP candidate and the conductor of the Dallas Mavericks offense, combining step-back scoring with elite vision." },
  { id: "tatum", slug: "jayson-tatum", name: "Jayson Tatum", firstName: "Jayson", lastName: "Tatum", teamSlug: "celtics", position: "Forward", jersey: 0, height: "6'8\"", weight: "210 lb", born: "1998-03-03", birthplace: "St. Louis, Missouri", draftYear: 2017, ppg: 26.9, rpg: 8.1, apg: 4.9, isStar: true, bio: "Jayson Tatum is the All-NBA cornerstone of the Boston Celtics and a 2024 champion, pairing scoring versatility with two-way growth." },
  { id: "embiid", slug: "joel-embiid", name: "Joel Embiid", firstName: "Joel", lastName: "Embiid", teamSlug: "76ers", position: "Center", jersey: 21, height: "7'0\"", weight: "280 lb", born: "1994-03-16", birthplace: "Yaounde, Cameroon", draftYear: 2014, ppg: 27.1, rpg: 10.2, apg: 4.3, isStar: true, bio: "Joel Embiid is a former MVP and the dominant low-post scorer of the Philadelphia 76ers, blending footwork, mid-range touch and rim protection." },
  { id: "ant", slug: "anthony-edwards", name: "Anthony Edwards", firstName: "Anthony", lastName: "Edwards", teamSlug: "timberwolves", position: "Guard", jersey: 5, height: "6'4\"", weight: "225 lb", born: "2001-08-05", birthplace: "Atlanta, Georgia", draftYear: 2020, ppg: 25.9, rpg: 5.4, apg: 5.1, isStar: true, bio: "Anthony Edwards is the explosive face of the Minnesota Timberwolves, a two-way wing with alpha scoring instincts and growing playmaking." },
  { id: "durant", slug: "kevin-durant", name: "Kevin Durant", firstName: "Kevin", lastName: "Durant", teamSlug: "suns", position: "Forward", jersey: 35, height: "6'11\"", weight: "240 lb", born: "1988-09-29", birthplace: "Washington, D.C.", draftYear: 2007, ppg: 27.1, rpg: 6.6, apg: 5.0, isStar: true, bio: "Kevin Durant is a two-time champion and one of the purest scorers ever, headlining the Phoenix Suns with elite efficiency at 6'11\"." },
  { id: "book", slug: "devin-booker", name: "Devin Booker", firstName: "Devin", lastName: "Booker", teamSlug: "suns", position: "Guard", jersey: 1, height: "6'4\"", weight: "206 lb", born: "1996-10-30", birthplace: "Grand Rapids, Michigan", draftYear: 2015, ppg: 27.1, rpg: 4.5, apg: 6.9, isStar: true, bio: "Devin Booker is a three-level scoring guard and the longtime cornerstone of the Phoenix Suns, known for clutch shot-making." },
  { id: "sga", slug: "shai-gilgeous-alexander", name: "Shai Gilgeous-Alexander", firstName: "Shai", lastName: "Gilgeous-Alexander", teamSlug: "thunder", position: "Guard", jersey: 2, height: "6'6\"", weight: "195 lb", born: "1998-07-12", birthplace: "Toronto, Canada", draftYear: 2018, ppg: 30.1, rpg: 5.5, apg: 6.2, isStar: true, bio: "Shai Gilgeous-Alexander is the 2025 MVP and leader of the Oklahoma City Thunder, a mid-range maestro who drives one of the league's best teams." },
  { id: "mitch", slug: "donovan-mitchell", name: "Donovan Mitchell", firstName: "Donovan", lastName: "Mitchell", teamSlug: "cavaliers", position: "Guard", jersey: 45, height: "6'3\"", weight: "215 lb", born: "1996-09-07", birthplace: "Elmsford, New York", draftYear: 2017, ppg: 26.6, rpg: 4.1, apg: 6.1, isStar: true, bio: "Donovan Mitchell is an explosive scoring guard and the engine of the Cleveland Cavaliers, pairing downhill attacking with improved playmaking." },
  { id: "dame", slug: "damian-lillard", name: "Damian Lillard", firstName: "Damian", lastName: "Lillard", teamSlug: "bucks", position: "Guard", jersey: 0, height: "6'2\"", weight: "195 lb", born: "1990-07-15", birthplace: "Oakland, California", draftYear: 2012, ppg: 24.3, rpg: 4.4, apg: 7.0, isStar: true, bio: "Damian Lillard is a franchise-point guard and elite deep shooter who now runs the show alongside Giannis in Milwaukee." },
  { id: "ja", slug: "ja-morant", name: "Ja Morant", firstName: "Ja", lastName: "Morant", teamSlug: "grizzlies", position: "Guard", jersey: 12, height: "6'2\"", weight: "174 lb", born: "1999-08-10", birthplace: "Dalzell, South Carolina", draftYear: 2019, ppg: 22.0, rpg: 4.1, apg: 7.3, isStar: true, bio: "Ja Morant is a highlight-reel point guard and the heartbeat of the Memphis Grizzlies, blending explosiveness with passing vision." },
  { id: "banchero", slug: "paolo-banchero", name: "Paolo Banchero", firstName: "Paolo", lastName: "Banchero", teamSlug: "magic", position: "Forward", jersey: 5, height: "6'10\"", weight: "250 lb", born: "2002-11-12", birthplace: "Seattle, Washington", draftYear: 2022, ppg: 22.6, rpg: 6.9, apg: 5.4, isStar: true, bio: "Paolo Banchero is the No. 1 pick and offensive hub of the Orlando Magic, a versatile forward who creates mismatches with size and skill." },
];

export const GAMES: Game[] = [
  { id: "g1", homeTeamSlug: "lakers", awayTeamSlug: "celtics", date: "2026-01-23T00:30:00Z", status: "scheduled", arena: "Crypto.com Arena", broadcast: "ABC", note: "Marquee matchup of two historic franchises." },
  { id: "g2", homeTeamSlug: "warriors", awayTeamSlug: "thunder", date: "2026-01-24T01:00:00Z", status: "scheduled", arena: "Chase Center", broadcast: "ESPN", note: "MVP-caliber guards collide out West." },
  { id: "g3", homeTeamSlug: "spurs", awayTeamSlug: "mavericks", date: "2026-01-25T00:30:00Z", status: "scheduled", arena: "Frost Bank Center", broadcast: "NBA TV", note: "Wembanyama faces Luka and Dallas." },
  { id: "g4", homeTeamSlug: "bucks", awayTeamSlug: "76ers", date: "2026-01-25T01:00:00Z", status: "scheduled", arena: "Fiserv Forum", broadcast: "TNT", note: "Embiid vs Giannis in the frontcourt." },
  { id: "g5", homeTeamSlug: "nuggets", awayTeamSlug: "timberwolves", date: "2026-01-26T02:00:00Z", status: "scheduled", arena: "Ball Arena", broadcast: "ESPN", note: "Jokic hosts Anthony Edwards and Minnesota." },
  { id: "g6", homeTeamSlug: "knicks", awayTeamSlug: "heat", date: "2026-01-27T00:30:00Z", status: "scheduled", arena: "Madison Square Garden", broadcast: "TNT", note: "Atlantic vs Southeast rivalry renews." },
  { id: "g7", homeTeamSlug: "suns", awayTeamSlug: "clippers", date: "2026-01-28T03:00:00Z", status: "scheduled", arena: "Footprint Center", broadcast: "NBA TV", note: "Durant and Booker host the Clippers." },
  { id: "g8", homeTeamSlug: "cavaliers", awayTeamSlug: "magic", date: "2026-01-29T00:00:00Z", status: "scheduled", arena: "Rocket Mortgage FieldHouse", broadcast: "League Pass", note: "Mitchell vs Banchero, two rising stars." },
  { id: "g9", homeTeamSlug: "raptors", awayTeamSlug: "nets", date: "2026-01-30T00:30:00Z", status: "scheduled", arena: "Scotiabank Arena", broadcast: "League Pass", note: "Cross-border Atlantic Division clash." },
  { id: "g10", homeTeamSlug: "thunder", awayTeamSlug: "nuggets", date: "2026-01-31T01:00:00Z", status: "scheduled", arena: "Paycom Center", broadcast: "ABC", note: "SGA and OKC host the defending-minded Nuggets." },
];

export const ARTICLES: Article[] = [
  {
    slug: "lebron-james-joins-philadelphia-76ers",
    title: "Breaking: LeBron James Joins the Philadelphia 76ers in a Blockbuster Move",
    excerpt: "In a stunning shake-up, four-time champion LeBron James is headed to Philadelphia to team with Joel Embiid — instantly reshaping the NBA's balance of power.",
    category: "Breaking News",
    author: "NBABite Editorial",
    publishedAt: "2026-07-26T08:00:00Z",
    updatedAt: "2026-07-26T08:00:00Z",
    tags: ["LeBron James", "Philadelphia 76ers", "blockbuster", "breaking"],
    breaking: true,
    body: [
      "The NBA world was turned on its head today as four-time champion LeBron James agreed to join the Philadelphia 76ers, pairing the league's all-time leading scorer with reigning MVP-caliber center Joel Embiid in one of the most consequential moves in recent memory.",
      "The deal sends James to the City of Brotherly Love after a decorated chapter out West, immediately making the 76ers the offseason's headline story and a preseason favorite in the Eastern Conference. With Embiid controlling the paint and James orchestrating the offense, Philadelphia now boasts one of the most intimidating one-two punches in the league.",
      "For James, 41, the move is another rewrite of his legacy — a fourth franchise, a fresh title window, and a chance to chase ring number five alongside one of the game's most dominant big men. For the 76ers, it accelerates a timeline that already featured a deep, talented core.",
      "Analysts are already debating how the fit works on the floor: Embiid's post dominance and James' tempo-bending playmaking could be complementary, but spacing, rotation minutes and defensive matchups will define whether this superteam reaches its ceiling.",
      "One thing is certain — the 76ers' schedule just became must-watch television, and the road to the Finals in the East now runs through Philadelphia. NBABite will track every twist of the story as it develops.",
    ],
  },
  {
    slug: "how-to-watch-nba-2025-26-season",
    title: "How to Watch the NBA in the 2025-26 Season: Every Legal Option",
    excerpt: "From NBA League Pass to the new broadcast deals with ESPN, NBC and Amazon, here is the complete legal guide to watching NBA basketball.",
    category: "Watch Guide",
    author: "NBABite Editorial",
    publishedAt: "2026-01-20T09:00:00Z",
    updatedAt: "2026-01-22T09:00:00Z",
    tags: ["how to watch", "NBA League Pass", "broadcast"],
    body: [
      "The 2025-26 NBA season arrives with the biggest broadcast shake-up in years. ABC and ESPN remain home to marquee games, NBC returns to NBA coverage for the first time in decades, and Amazon Prime Video joins as a new national carrier.",
      "NBA League Pass remains the league's official out-of-market streaming product, offering every game that isn't subject to local blackout restrictions. For most fans, a combination of League Pass plus a live-TV service carrying ABC/ESPN (such as YouTube TV, Hulu + Live TV, Sling or FuboTV) covers the full slate.",
      "Blackouts still apply: in-market games may be unavailable on League Pass, so a regional sports network or national broadcast is the reliable path locally. Always use official providers to support the league and avoid unsafe, low-quality streams.",
    ],
  },
  {
    slug: "victor-wembanyama-the-spurs-new-era",
    title: "Victor Wembanyama and the San Antonio Spurs' New Era",
    excerpt: "How the 7'4\" French phenom is reshaping the Spurs' identity and what to expect as San Antonio builds around its generational center.",
    category: "Player Spotlight",
    author: "NBABite Editorial",
    publishedAt: "2026-01-19T09:00:00Z",
    tags: ["Wembanyama", "Spurs", "rookie"],
    body: [
      "When the San Antonio Spurs drafted Victor Wembanyama first overall, they acquired a player unlike any other in league history. At 7'4\" he protects the rim like a center while handling and shooting like a wing.",
      "The Spurs' developmental tradition — five championships built on patience and fundamentals — is the ideal environment for a prospect of his ceiling. Expect the team to surround him with shooters and movers who maximize his two-way impact.",
      "For fans tracking the league's future, Wembanyama is the clearest franchise cornerstone of the next decade.",
    ],
  },
  {
    slug: "lebron-james-lakers-chasing-history",
    title: "LeBron James' Lakers Legacy: A Look Back at a Purple & Gold Chapter",
    excerpt: "Before his stunning move to Philadelphia, LeBron James authored a memorable Lakers chapter. A look back at his legacy in Los Angeles.",
    category: "Player Spotlight",
    author: "NBABite Editorial",
    publishedAt: "2026-01-18T09:00:00Z",
    tags: ["LeBron", "Lakers", "legacy"],
    body: [
      "LeBron James entered the league in 2003 and, across two decades, became the NBA's all-time leading scorer and a four-time champion. His Los Angeles chapter delivered a 2020 title in the Orlando bubble and some of the most watched basketball of his era.",
      "In Los Angeles he reinforced his reputation as a versatile, high-IQ forward capable of lifting any roster. His playmaking, size and timing made the Lakers a perennial contender during his tenure.",
      "Now beginning a new chapter in Philadelphia, James leaves behind a Lakers legacy defined by resilience and a championship — and his place among the game's immortals is secure.",
    ],
  },
  {
    slug: "stephen-curry-warriors-dynasty",
    title: "Stephen Curry and the Enduring Golden State Warriors Dynasty",
    excerpt: "How Curry's shooting changed basketball, and why the Warriors remain contenders year after year.",
    category: "Team Feature",
    author: "NBABite Editorial",
    publishedAt: "2026-01-17T09:00:00Z",
    tags: ["Curry", "Warriors", "dynasty"],
    body: [
      "Stephen Curry's rise turned the Golden State Warriors into a dynasty. His unlimited range forced defenses to reposition and inspired a league-wide embrace of the three-pointer.",
      "With four titles and two MVPs, Curry's gravity creates advantages no box score fully captures. The Warriors' system — movement, spacing and selfless passing — was built around him.",
      "As the roster evolves, the franchise's identity remains tied to Curry's brilliance and the culture of winning he helped establish.",
    ],
  },
  {
    slug: "2025-26-title-contenders",
    title: "2025-26 NBA Title Contenders: Who Can Win It All?",
    excerpt: "Breaking down the teams with the best odds to lift the Larry O'Brien Trophy this season.",
    category: "League Preview",
    author: "NBABite Editorial",
    publishedAt: "2026-01-16T09:00:00Z",
    tags: ["contenders", "preview", "championship"],
    body: [
      "The 2025-26 title race is wide open. The Oklahoma City Thunder, fresh off a championship, return a young core led by MVP Shai Gilgeous-Alexander.",
      "Out East, the Boston Celtics remain the team to beat after their 2024 crown, while the Cleveland Cavaliers and New York Knicks push to close the gap.",
      "Western threats include the Denver Nuggets (Jokic), Minnesota Timberwolves and a loaded Los Angeles field. Depth, health and shot-making will decide it.",
    ],
  },
  {
    slug: "nba-rookies-to-watch",
    title: "NBA Rookies to Watch Beyond the Lottery",
    excerpt: "Which first-year players could exceed expectations and become building blocks for their franchises.",
    category: "League Preview",
    author: "NBABite Editorial",
    publishedAt: "2026-01-15T09:00:00Z",
    tags: ["rookies", "draft", "youngsters"],
    body: [
      "Every season, late-first and second-round picks outperform their draft slot. This year's class is no different, with versatile wings and skilled bigs landing in developmental situations.",
      "Teams like the Spurs, Magic and Thunder have shown how to accelerate young talent. Watch for two-way wings who can defend multiple positions and space the floor.",
      "Rookie development is the surest path to sustainable contention, and several of these names will appear in All-Star conversations within a few years.",
    ],
  },
];

// ---------- helpers ----------
export function getTeam(slug: string): Team | undefined {
  return TEAMS.find((t) => t.slug === slug);
}
export function getPlayer(slug: string): Player | undefined {
  return PLAYERS.find((p) => p.slug === slug);
}
export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
export function getPlayersByTeam(teamSlug: string): Player[] {
  return PLAYERS.filter((p) => p.teamSlug === teamSlug);
}
export function starPlayers(): Player[] {
  return PLAYERS.filter((p) => p.isStar);
}

// Resolve a news/article tag to a Team when the tag refers to a franchise
// (e.g. "Lakers", "76ers", "Warriors"). Used to show team logos next to tags.
export function teamForTag(tag: string): Team | undefined {
  const t = tag.trim().toLowerCase();
  if (!t) return undefined;
  return TEAMS.find(
    (team) =>
      team.slug === t ||
      team.shortName.toLowerCase() === t ||
      team.name.toLowerCase().includes(t),
  );
}

