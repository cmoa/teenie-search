// Initialize algolia search
import algoliasearch from 'algoliasearch/lite';
const searchClient = algoliasearch(
  '9HG4DVEE7B',
  '5b535b7b4291caa0aef835c2a21f3b1e'
);
const index = searchClient.initIndex('employer-records', (err) => { console.log(err); });

// Actions
export function updateSearchTerm(term){
	return {
    	type: "UPDATE_SEARCH",
    	term: term
	}
}

export function openPhoto(irn) {
    
    return {
        type: "OPEN_PHOTO",
        photo: {
            "irn": "16943",
            "url": "https://cmoa-collection-images.s3.amazonaws.com/teenie/24607/16943.jpg",
            "emuRecord": {
                "ecatalogue_key": "73",
                "irn": "16943",
                "TitAccessionNo": "2001.35.8837",
                "TitMainTitle": "Man speaking at podium with Jesse Jackson beside him",
                "CreDateCreated": "March 1972",
                "CreEarliestDate": "1972-03-01",
                "CreLatestDate": "1972-03-11",
                "PhyMediumComments": "black-and-white: Kodak safety film",
                "CatDescriptText": "Cutline of related image published in New Pittsburgh Courier newspaper, March 11, 1972, pg. 22, reads: \"BLACK SOLIDARITY! - The Rev. Jesse Jackson, of Chicago, Ill. Center, president and organizer of PUSH. People United to Save Humanity, was in Pittsburgh recently for the purpose of uniting black forces and stimulating action for an effective 'Black Solidarity Day' observance set to take place here at the Civic Arena, Thursday, May 4... - Harris Photo.\"",
                "CatSubject_tab": "Jackson, Jesse, 1941-\nMen--Pennsylvania--Pittsburgh.",
                "CreCountry_tab": "United States",
                "CreState_tab": "Pennsylvania",
                "CreDistrict_tab": "Allegheny county",
                "CreCity_tab": "Pittsburgh",
                "CrePlaceQualifier_tab": ""
            }
        }
    }
}

export function closePhoto() {
    return {
        type: "CLOSE_PHOTO"
    }
}

export function search(term) {
  return dispatch => {

    dispatch({ type: "SEARCH", term: term});

    var searchObj = { hitsPerPage: 50, query: term };

    // Uncomment to use Algolia when ready:

    // index.search(searchObj).then(res => {
    //   let hits = res.hits;
    //   let hitsCount = res.nbHits;
    //   let pageCount = res.nbPages;

    //   dispatch({
    //     type: "UPDATE_RESULTS",
    //     hits: hits,
    //   });
    // });

    var suggestedSearchTerms = [
            "Hill District",
            "1950s",
            "Jazz",
            "Presidents",
            "Civil Rights",
            "Portraits",
        ]

    var hits = [];

    if (suggestedSearchTerms.indexOf(term) !== -1) {
        var hits = [
            {
                "irn": "10254",
                "url": "https://cmoa-collection-images.s3.amazonaws.com/teenie/21196/10254.jpg",
                "emuRecord": {
                    "ecatalogue_key": "43",
                    "irn": "10254",
                    "TitAccessionNo": "2001.35.5802",
                    "TitMainTitle": "Emily King, E. Bernice Coleman, Helen Delany, Sarah Moore, and Gladys Beverly, standing in front of painted stone backdrop, for Beauty Shop Owners' Fashion Review in Schenley High School",
                    "CreDateCreated": "March 1945",
                    "CreEarliestDate": "1945-03-01",
                    "CreLatestDate": "1945-03-31",
                    "PhyMediumComments": "black-and-white: Agfa safety film",
                    "CatDescriptText": "Cutline of image published in Pittsburgh Courier newspaper, March 24, 1945, pg. 8 reads: \"Gorgeous Glamour Girls - This bevy of fashionable young women added plenty of dash and charm to the Beauty Shop Owners' Fashion Revue, Tuesday evening, in Schenley High School Auditorium. Smartly dressed from head to toe, they set the pace for styles in Easter Parade and summer sports wear.  Right photo, suited and ready for Easter: Emily King, E. Bernice Coleman, Helen Delany, Sarah Moore, and Gladys Beverly.-Harris Photo.\"  Related images published in Pittsburgh Courier newspaper, March 24, 1945, pg. 13",
                    "CatSubject_tab": "Women--Pennsylvania--Pittsburgh.\nGroup portraits--Pennsylvania--Pittsburgh.\nHats--Pennsylvania--Pittsburgh.\nFur--Pennsylvania--Pittsburgh.\nFashion models--Pennsylvania--Pittsburgh.\nSchenley High School (Pittsburgh, Pa.)",
                    "CreCountry_tab": "United States",
                    "CreState_tab": "Pennsylvania",
                    "CreDistrict_tab": "Allegheny county",
                    "CreCity_tab": "Pittsburgh",
                    "CrePlaceQualifier_tab": ""
                }
            },
            {
                "irn": "13034",
                "url": "https://cmoa-collection-images.s3.amazonaws.com/teenie/22247/13034.jpg",
                "emuRecord": {
                    "ecatalogue_key": "52",
                    "irn": "13034",
                    "TitAccessionNo": "2001.35.6734",
                    "TitMainTitle": "Boxer \"Jersey\" Joe Walcott with baby on lap getting haircut from barber Clarence \"Speedy\" Williams in Crystal Barber Shop",
                    "CreDateCreated": "July 1951",
                    "CreEarliestDate": "1951-07-01",
                    "CreLatestDate": "1951-07-31",
                    "PhyMediumComments": "black-and-white: Kodak safety film",
                    "CatDescriptText": "The Crystal Barber Shop and Billiard Parlor was owned by Woogie Harris.\nCutline of related image published in Pittsburgh Courier newspaper, July 28, 1951, page 2, reads: \"Detectives Guard Champ's Haircut - When the new heavyweight champion, Jersey Joe Walcott, stopped off at \"Woogie\" Harris' Crystal Barber Shop on Wylie Avenue last Thursday to get a haircut after his knockout of Ezzard Charles, the previous night, the crowd that wanted to get a look at Walcott were so thick police had to protect him from his admirers. Here Detectives Eugene Parker, James Voyle Parker and John B. Thompson, who acted as bodyguards for Walcott while he was here, wait for the new champ to get his hair clipped by barber \"Speedy\" Williams. - Harris Photo\"",
                    "CatSubject_tab": "Barbers--Pennsylvania--Pittsburgh.\nBarber shops--Pennsylvania--Pittsburgh.\nBoxers--Pennsylvania--Pittsburgh.\nMen--Pennsylvania--Pittsburgh.\nBabies--Pennsylvania--Pittsburgh.\nWalcott, Jersey Joe, 1914-1994.\nWilliams, Clarence.\nCrystal Barber Shop (Pittsburgh, Pa.)",
                    "CreCountry_tab": "United States",
                    "CreState_tab": "Pennsylvania",
                    "CreDistrict_tab": "Allegheny county",
                    "CreCity_tab": "Pittsburgh",
                    "CrePlaceQualifier_tab": ""
                }
            },
            {
                "irn": "13413",
                "url": "https://cmoa-collection-images.s3.amazonaws.com/teenie/22575/13413.jpg",
                "emuRecord": {
                    "ecatalogue_key": "60",
                    "irn": "13413",
                    "TitAccessionNo": "2001.35.6996",
                    "TitMainTitle": "Nat King Cole, Harold Keith, George Pitts, and Gulf Oil executive Roy Kohler, posed in Carlton House for Capitol Records press party",
                    "CreDateCreated": "January - February 1959",
                    "CreEarliestDate": "1959-01-01",
                    "CreLatestDate": "1959-02-07",
                    "PhyMediumComments": "black-and-white: Kodak safety film",
                    "CatDescriptText": "Cutline of related image published in Pittsburgh Courier newspaper, February 7, 1959, pg. 18, reads: \" Party Crashers - Old charmer Nat King Cole smiles at four youngsters, Howard and George Parker, Steven Trent and James J. Jackson, who \"crashed\" a Capitol Records press party for Cole at Pittsburgh's Carlton House. The kids, hearing about the affair, said they \"just had to see Nat King Cole.\"  In background is deejay Dave Scott. - Harris Photo.\"",
                    "CatSubject_tab": "Cole, Nat King, 1917-1965.\nMen--Pennsylvania--Pittsburgh.\nInteriors--Pennsylvania--Pittsburgh.\nGroup portraits--Pennsylvania--Pittsburgh.\nCarlton House (Pittsburgh, Pa.)",
                    "CreCountry_tab": "United States",
                    "CreState_tab": "Pennsylvania",
                    "CreDistrict_tab": "Allegheny county",
                    "CreCity_tab": "Pittsburgh",
                    "CrePlaceQualifier_tab": ""
                }
            },
            {
                "irn": "16943",
                "url": "https://cmoa-collection-images.s3.amazonaws.com/teenie/24607/16943.jpg",
                "emuRecord": {
                    "ecatalogue_key": "73",
                    "irn": "16943",
                    "TitAccessionNo": "2001.35.8837",
                    "TitMainTitle": "Man speaking at podium with Jesse Jackson beside him",
                    "CreDateCreated": "March 1972",
                    "CreEarliestDate": "1972-03-01",
                    "CreLatestDate": "1972-03-11",
                    "PhyMediumComments": "black-and-white: Kodak safety film",
                    "CatDescriptText": "Cutline of related image published in New Pittsburgh Courier newspaper, March 11, 1972, pg. 22, reads: \"BLACK SOLIDARITY! - The Rev. Jesse Jackson, of Chicago, Ill. Center, president and organizer of PUSH. People United to Save Humanity, was in Pittsburgh recently for the purpose of uniting black forces and stimulating action for an effective 'Black Solidarity Day' observance set to take place here at the Civic Arena, Thursday, May 4... - Harris Photo.\"",
                    "CatSubject_tab": "Jackson, Jesse, 1941-\nMen--Pennsylvania--Pittsburgh.",
                    "CreCountry_tab": "United States",
                    "CreState_tab": "Pennsylvania",
                    "CreDistrict_tab": "Allegheny county",
                    "CreCity_tab": "Pittsburgh",
                    "CrePlaceQualifier_tab": ""
                }
            }
        ]
    }

    dispatch({
        type: "UPDATE_RESULTS",
        hits: hits,
        hitsCount: hits.length,
    });
  }
}

