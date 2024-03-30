export const exampleReadingListRequest = {
  status: "success",
  statusCode: 200,
  data: [
    {
      readingListId: 1,
      issues: [
        {
          issueId: "36",
          comicId: "batman-2011",
          pages: null,
        },
        {
          issueId: "38",
          comicId: "batman-2011",
          pages: null,
        },
      ],
      shared: true,
      userId: "e65b2c9b-9dad-4642-b041-2640b0663af6",
      name: "Key Batman Issues",
      description: "This is when something happened in the New 52 Batman",
      coverImg: "https://2.bp.blogspot.com/R2aPe7pFTOa9TBp7XDofGc9jhlLtLAS82cisIhr1mMrCxedGoDitxU14ElalFPJTp7klX441kqtQ=s0",
      likes: 0,
      dislikes: 1,
      rating: -1,
      createdBy: "CoolUser123",
    },
  ],
  pageNumber: 1,
  maxPage: 1,
};

export const readingListIdResponse = {
  status: "success",
  statusCode: 200,
  data: {
    readingListId: 1,
    issues: [
      {
        issueId: "36",
        comicId: "batman-2011",
        pages: null,
      },
      {
        issueId: "38",
        comicId: "batman-2011",
        pages: null,
      },
    ],
    shared: true,
    userId: "e65b2c9b-9dad-4642-b041-2640b0663af6",
    name: "Key Batman Issues",
    description: "This is when something happened in the New 52 Batman",
    coverImg: "null",
    likes: 0,
    dislikes: 1,
    rating: -1,
    createdBy: "CoolUser123",
  },
  pageNumber: null,
  maxPage: null,
};

export const popularReadingListResponse = {
  status: "success",
  statusCode: 200,
  data: [
    {
      readingListId: 16,
      issues: null,
      shared: true,
      userId: "4d22e259-cbdf-4d96-a9d6-b605139ef9a5",
      name: "Iconic Spider-Man moments",
      description: "These some iconic Spider-Man Issues ",
      coverImg: "https://2.bp.blogspot.com/-pZsU4tr2gS8/VnpucHNahCI/AAAAAAAAPjI/bdwQMlqzHxw/s0-Ic42/RCO001.jpg",
      likes: 100,
      dislikes: 0,
      rating: 100,
      createdBy: "SpideyFan",
    },
    {
      readingListId: 21,
      issues: null,
      shared: true,
      userId: "4d22e259-cbdf-4d96-a9d6-b605139ef9a5",
      name: "Daredevil by Brian Michael Bendis",
      description:
        "Brian Michael Bendis' run on Daredevil. Great for newcomers, fans of the netflix show, or anyone wanting to read good superhero comics",
      coverImg: "https://2.bp.blogspot.com/-11q2UI-laGo/Vj7y49bCuYI/AAAAAAAAu-Y/CBhdF6XlkYM/s0-Ic42/Daredevil%252520v2%252520016-000.jpg",
      likes: 50,
      dislikes: 2,
      rating: 48,
      createdBy: "BlindAsABatMan",
    },
    {
      readingListId: 1,
      issues: [
        {
          issueId: "36",
          comicId: "batman-2011",
          pages: null,
        },
        {
          issueId: "38",
          comicId: "batman-2011",
          pages: null,
        },
      ],
      shared: true,
      userId: "e65b2c9b-9dad-4642-b041-2640b0663af6",
      name: "Key Batman Issues",
      description: "This is when something happened in the New 52 Batman",
      coverImg: "https://2.bp.blogspot.com/R2aPe7pFTOa9TBp7XDofGc9jhlLtLAS82cisIhr1mMrCxedGoDitxU14ElalFPJTp7klX441kqtQ=s0",
      likes: 0,
      dislikes: 1,
      rating: -1,
      createdBy: "CoolUser123",
    },
  ],
  pageNumber: null,
  maxPage: null,
};

export const searchComicsResponse = {
  comics: [
    {
      comicId: "batman-robin-eternal",
      name: "Batman & Robin Eternal ",
      coverImg: "https://xoxocomic.com/images/series/309.jpg",
      issueIds: null,
    },
    {
      comicId: "batman-66-2013",
      name: "Batman '66 [I] ",
      coverImg: "https://1.bp.blogspot.com/-TFWZlnyRYfI/YOWOwi9TYvI/AAAAAAAAvn0/XxOcWni-lBoaveyNomFcCCEc8-q89D3DwCLcBGAsYHQ/s0/Batman%2B66-min.jpg",
      issueIds: null,
    },
    {
      comicId: "batman-66-the-lost-episode",
      name: "Batman '66 - The Lost Episode ",
      coverImg: "https://xoxocomic.com/images/series/313.jpg",
      issueIds: null,
    },
    {
      comicId: "batman-arkham-knight-genesis",
      name: "Batman - Arkham Knight - Genesis ",
      coverImg:
        "https://4.bp.blogspot.com/-XfxxV25nfUI/W_ZktBWC6eI/AAAAAAAAID4/t0eRfV2Cjg4-q8aR-gk4X83jdIs2ZlIGgCLcBGAs/s1600/Batman%2BArkham%2BKnight%2BGenesis-min.jpg",
      issueIds: null,
    },
    {
      comicId: "batman-arkham-knight-annual",
      name: "Batman - Arkham Knight Annual ",
      coverImg: "https://xoxocomic.com/images/series/325.jpg",
      issueIds: null,
    },
    {
      comicId: "batman-earth-one-2012",
      name: "Batman - Earth One (2012) ",
      coverImg: "https://xoxocomic.com/images/series/327.jpg",
      issueIds: null,
    },
    {
      comicId: "batman-endgame-special-edition",
      name: "Batman - Endgame Special Edition ",
      coverImg: "https://xoxocomic.com/images/series/329.jpg",
      issueIds: null,
    },
    {
      comicId: "batman-europa-2016",
      name: "Batman: Europa ",
      coverImg: "https://xoxocomic.com/images/series/331.jpg",
      issueIds: null,
    },
    {
      comicId: "batman-futures-end",
      name: "Batman - Futures End ",
      coverImg: "https://xoxocomic.com/images/series/333.jpg",
      issueIds: null,
    },
    {
      comicId: "batman-jokers-daughter",
      name: "Batman - Joker's Daughter ",
      coverImg: "https://xoxocomic.com/images/series/335.jpg",
      issueIds: null,
    },
    {
      comicId: "batman-noel",
      name: "Batman - Noel ",
      coverImg: "https://xoxocomic.com/images/series/341.jpg",
      issueIds: null,
    },
    {
      comicId: "batman-shadow-of-the-bat-convergence",
      name: "Convergence Batman: Shadow of the Bat ",
      coverImg: "https://xoxocomic.com/images/series/343.jpg",
      issueIds: null,
    },
    {
      comicId: "batman-the-dark-knight",
      name: "Batman: The Dark Knight [II] (2011) ",
      coverImg: "https://xoxocomic.com/images/series/345.jpg",
      issueIds: null,
    },
    {
      comicId: "batman-the-dark-knight-annual",
      name: "Batman - The Dark Knight Annual ",
      coverImg: "https://xoxocomic.com/images/series/347.jpg",
      issueIds: null,
    },
    {
      comicId: "batman-the-dark-knight-returns-10th-anniversary",
      name: "DC Comics Essentials: The Dark Knight Returns ",
      coverImg: "https://xoxocomic.com/images/series/349.jpg",
      issueIds: null,
    },
    {
      comicId: "batman-the-jiro-kuwata-batmanga",
      name: "Batman - The Jiro Kuwata Batmanga ",
      coverImg:
        "https://1.bp.blogspot.com/-e6WnedIRoPs/XL2hTy6cK_I/AAAAAAAAM70/VJjF-dqPCzwttRBSD1Nkffj4LDhPKek8ACLcBGAs/s1600/Batman%2B-%2BThe%2BJiro%2BKuwata%2BBatmanga-min.jpg",
      issueIds: null,
    },
    {
      comicId: "batman-the-long-halloween-1998",
      name: "Batman: The Long Halloween ",
      coverImg:
        "https://1.bp.blogspot.com/-Pxam856LboU/Wv7PW9myaYI/AAAAAAAABn4/MhO3mEvvJg84qlvrlWXM6tSDhfa6Oc7uQCLcBGAs/s1600/batman_the_long_hall_o6nqt.jpg",
      issueIds: null,
    },
    {
      comicId: "batman-year-one-by-frank-miller",
      name: "Batman: Year One ",
      coverImg: "https://xoxocomic.com/images/series/357.jpg",
      issueIds: null,
    },
    {
      comicId: "batman-and-robin-annual",
      name: "Batman and Robin Annual ",
      coverImg: "https://xoxocomic.com/images/series/363.jpg",
      issueIds: null,
    },
    {
      comicId: "batman-beyond-2015",
      name: "Batman Beyond (2015) ",
      coverImg: "https://xoxocomic.com/images/series/369.jpg",
      issueIds: null,
    },
    {
      comicId: "batman-beyond-2-0",
      name: "Batman Beyond 2.0 ",
      coverImg: "https://xoxocomic.com/images/series/371.jpg",
      issueIds: null,
    },
    {
      comicId: "batman-eternal",
      name: "Batman Eternal ",
      coverImg: "https://xoxocomic.com/images/series/373.jpg",
      issueIds: null,
    },
    {
      comicId: "batman-incorporated",
      name: "Batman Incorporated (2012) ",
      coverImg:
        "https://1.bp.blogspot.com/-XZFyBwGrudw/XRtxJ6Wf4hI/AAAAAAAAOuc/75b4UAcJdD4PG0HsjqfgtgLTy3yHnWVzACLcBGAs/s1600/Batman%2BIncorporated%2B%25282012%2529-min.jpg",
      issueIds: null,
    },
    {
      comicId: "batman-incorporated-special",
      name: "Batman, Incorporated Special ",
      coverImg: "https://xoxocomic.com/images/series/379.jpg",
      issueIds: null,
    },
    {
      comicId: "batman-superman",
      name: "Batman/Superman (2013) ",
      coverImg: "https://xoxocomic.com/images/series/381.jpg",
      issueIds: null,
    },
    {
      comicId: "batman-superman-annual",
      name: "Batman/Superman: Annual ",
      coverImg: "https://xoxocomic.com/images/series/383.jpg",
      issueIds: null,
    },
    {
      comicId: "batman-superman-futures-end",
      name: "Batman/Superman: Futures End ",
      coverImg: "https://xoxocomic.com/images/series/385.jpg",
      issueIds: null,
    },
    {
      comicId: "batman-teenage-mutant-ninja-turtles-2016",
      name: "Batman/Teenage Mutant Ninja Turtles (2016) ",
      coverImg: "https://xoxocomic.com/images/series/387.jpg",
      issueIds: null,
    },
    {
      comicId: "damian-son-of-batman",
      name: "Damian - Son of Batman ",
      coverImg: "https://xoxocomic.com/images/series/605.jpg",
      issueIds: null,
    },
    {
      comicId: "forever-evil-aftermath-batman-vs.-bane",
      name: "Forever Evil Aftermath - Batman vs. Bane ",
      coverImg: "https://xoxocomic.com/images/series/903.jpg",
      issueIds: null,
    },
    {
      comicId: "justice-league-the-darkseid-war-batman-2015",
      name: "Justice League: Darkseid War: Batman ",
      coverImg: "https://xoxocomic.com/images/series/1357.jpg",
      issueIds: null,
    },
    {
      comicId: "batman-by-ed-brubaker",
      name: "Batman by Ed Brubaker ",
      coverImg:
        "https://4.bp.blogspot.com/-CJS0LmJSMck/W0N7RmnQHyI/AAAAAAAADWA/VCyGvY6GRH41k8j1Q5HPEtNqDlrALMmuwCLcBGAs/s1600/batman_by_ed_brubake_GK5Hz.jpg",
      issueIds: null,
    },
    {
      comicId: "batman-superman-wonder-woman-trinity",
      name: "Batman/Superman/Wonder Woman: Trinity ",
      coverImg: "https://xoxocomic.com/images/series/3387.jpg",
      issueIds: null,
    },
    {
      comicId: "batman-1940",
      name: "Batman (1940) ",
      coverImg:
        "https://2.bp.blogspot.com/-vMnmi81hpCk/XCXr3I48MXI/AAAAAAAAJVA/eo4CNZ1AYrsHzUHSG5B2guRopLmszhwdgCLcBGAs/s1600/Batman%2B%25281940%2529-min.jpg",
      issueIds: null,
    },
    {
      comicId: "batman-beyond-2010",
      name: "Batman Beyond (2010) ",
      coverImg: "https://xoxocomic.com/images/series/3521.jpg",
      issueIds: null,
    },
    {
      comicId: "batman-beyond-2011",
      name: "Batman Beyond (2011) ",
      coverImg: "https://xoxocomic.com/images/series/3523.jpg",
      issueIds: null,
    },
  ],
  currentPage: 1,
  maxPage: 7,
};

export const comicIdResponse = {
  comicId: "daredevil-born-again",
  name: "Daredevil: Born Again",
  coverImg:
    "https://1.bp.blogspot.com/-I-SxoM2hEcU/Xm4jLgJGL9I/AAAAAAAAVwg/mToU6bccfNEz48wcehjttd0X3z4NIhZkACLcBGAsYHQ/s1600/Daredevil%2BBorn%2BAgain-min.jpg",
  issueIds: ["full"],
};

export const popularComicResponse = {
  status: "success",
  statusCode: 200,
  data: {
    comics: [
      {
        comicId: "ultimate-spider-man-infinity-comic",
        name: "Ultimate Spider-Man Infinity Comic ",
        coverImg:
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiOtOqDVM9ms7sIhRUjObMNIFna0v6M_S-gnZWbQjvQ-Vp-dccyhQD67yL5ywD7WwYFYSI80yn6iSVSh3wFwMop8lhs2cKF77_pSTD6cyy9aakf8VWHV6bkwucRIwfo8j3YdvAaTAbhtlYExXn1xxsmZrXP4Z9WGalBALTUxXYrcTJM4y1Z_o3vWR7edyw/s1600/ultimate-spider-man-infinity-comic-mycomiclist.jpeg",
        issueIds: null,
      },
      {
        comicId: "world-of-archie-double-digest",
        name: "World of Archie Double Digest ",
        coverImg: "https://xoxocomic.com/images/series/7252.jpg",
        issueIds: null,
      },
      {
        comicId: "guardians-of-the-galaxy-2023",
        name: "Guardians of the Galaxy (2023) ",
        coverImg:
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg1Z5tufjv3y19UQxnMRDi2dEp4zHq6zQtiJgMKHnIqHONr0ShJzKMVNZ2nzo7JF-nDjyXhUsNfLnHwXqIptrnSzwXCabLe6Fxn_O9Lz9MbRFhx6Be0C1Q8ZokUZh8SD4VgMpll_Z2hRBnsLmcvgPYErYU4jyoJ2o4Hvur-ZnkodMSvPpvUfBmh_DST/s1600/Guardians%20of%20the%20Galaxy%20(2023)-min.jpeg",
        issueIds: null,
      },
      {
        comicId: "incredible-hulk-2023",
        name: "Incredible Hulk (2023) ",
        coverImg:
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiUTGu82TS8B5V8RxprGC9J9ZprOBwOWeI4GqlF3ztWCQXhMNA1_yCaIYS05D1EqUkr6KCn6mRYUwS2jh8LGOthLFKbE4mmpMbmw9m7seRdrgBN3RmkQob8ArjXcnZhm4gCpoqIhvm3P0WP9y6vkqciFURO7ylbkVTlHpm-rv_qX_2lhP5udvqdxCbYhS0/s1600/Incredible%20Hulk%20(2023)-holacomic.jpeg",
        issueIds: null,
      },
      {
        comicId: "transformers-2023",
        name: "Transformers (2023) ",
        coverImg:
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgtjYds4uYOHdNC3nH7xwSuOeusfAFyDm7X1IUfmSw78WFU35fiXJX8rvJZ272Gy4OL8f2ANRLg49ytOftjCCpKaxoCg3UMKWD8GYieozBQVznU7t7JhJyl4LqpechJm3ZvRsDe9cj5OV475TLC77xQYk0yQx-8RKR1Wtb_xAqD19aEhssA0sYFSCYfuGk/s1600/Transformers%20(2023)-holacomic.jpeg",
        issueIds: null,
      },
      {
        comicId: "star-wars-2020",
        name: "Star Wars (2020) ",
        coverImg:
          "https://1.bp.blogspot.com/-w7bzNXM8RoU/Xg1MVqCea2I/AAAAAAAATsw/VHEbZa3lNagthmFCSIgjnOlpBKQFtEm0ACLcBGAsYHQ/s1600/Star%2BWars%2B%25282020%2529-min.jpg",
        issueIds: null,
      },
      {
        comicId: "i-hate-fairyland-2022",
        name: "I Hate Fairyland (2022) ",
        coverImg:
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhr3uXXQaQm7vt1fdKRUO-4gfSFn3IW3FmoWSGCzQmA5tRs8WqVr4CFzM2GYj5GYMQuIeCD2nS8lDFi2RyXOunmlLe6ukNt4lA4Q4cWM2BA6o1QeJb7GSaH3SlcP24htXt4LATEquMHNG5MDvt3PTzWcC5R7g_H8Pa_xNEvioO0uHmCu3mApKhHdPe-/s1600/I%20Hate%20Fairyland%20(2022)-min.jpeg",
        issueIds: null,
      },
      {
        comicId: "the-walking-dead-deluxe",
        name: "The Walking Dead Deluxe ",
        coverImg:
          "https://1.bp.blogspot.com/-V9jz74VGih4/X35zQpzPxRI/AAAAAAAAk9w/6KFXAjR0qUQ-KaHu7xbumySBLxxSmnBXACLcBGAsYHQ/s0/The%2BWalking%2BDead%2BDeluxe-min.jpg",
        issueIds: null,
      },
      {
        comicId: "spawn",
        name: "Spawn ",
        coverImg: "https://4.bp.blogspot.com/-yG_0w0iX_cI/WuqYZ6qPCSI/AAAAAAAABMw/dmWuq5F1MPsCPtM3_tX2TExGgfr-wBLgwCLcBGAs/s1600/spawn.jpg",
        issueIds: null,
      },
      {
        comicId: "army-of-darkness-forever",
        name: "Army of Darkness Forever ",
        coverImg:
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgqLhnbikhisNOWwEWHKGNnPm6F2cByDGGTRD9dItJRh1H5qsuEfOeoSKuNv08fdRBJoBGvlBaLV93iDV7GOcfqsnSBtDWGfHMZXme4g9myRo6LkCHso1MyuUwzrGHEj_1Z-pYch_Pe-xGJPF_oyyJyTtmEADT7mlnerr8f32ggOIhVUIxAJduFdQf4g8Y/s1600/Army%20of%20Darkness%20Forever-holacomic.jpeg",
        issueIds: null,
      },
      {
        comicId: "the-savage-dragon-1993",
        name: "The Savage Dragon (1993) ",
        coverImg: "https://2.bp.blogspot.com/-btDJA8Gi6Dw/W1ia5Ti5BcI/AAAAAAAAD8U/gbY4rXEURfc7oI6t-cSoG88m1r3B0t2BQCLcBGAs/s1600/6924.jpg",
        issueIds: null,
      },
      {
        comicId: "luke-cage-gang-war",
        name: "Luke Cage: Gang War ",
        coverImg:
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiw_-2gPMpAm68LB-D137aaVaSbYjDt10JUYVuP2YybkZjuCZGzAYlHzQchWbMoLBAgp8ws_Y5Bv3YabXqfPeJHl-cKMo2uWwOBJNzDnyneKHBCst4fBz0IhUQtGP879pYm7Inq5MeVoi29x3XyyBxzHS6U3EdCipMfUHM8FNQd3ompt6x1E9KHcXgMUwc/s1600/luke-cage-gang-war-holacomic.jpeg",
        issueIds: null,
      },
      {
        comicId: "daredevil-2023",
        name: "Daredevil (2023) ",
        coverImg:
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi6vPWt8fWHWwg9an6UYIZCKAXnM5tQzSo1hz5ltNxWUegwB_lLr-1XfH0KCFfIPQfxqd80RvMYJVDKXbAt02vAn45K4zZ7WjXdQ032H8vNN0xTd-1-TpLKY3bosOPVkTgSvAN64V8UKXnakxV_nm85cs6Eg-qqnpkwxK2mjVAgXlMNE15o2srSeiB3eeU/s1600/Daredevil%20(2023)-holacomic.jpeg",
        issueIds: null,
      },
      {
        comicId: "marvel-super-heroes-secret-wars-battleworld",
        name: "Marvel Super Heroes Secret Wars: Battleworld ",
        coverImg:
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiXlsgIGvEoTESP5vrL4kcTosqtfeBrOv-D_7iwecD22mLh0kZetw6QLrYIHcbvI08o9b9GEWB-Wu7mfF0jYxBVqMwyCFXS9azWGSYUDIz3gH1VgrwdeQuZrt6M2wKQpgTWOXSaKFSjEAmNR7821vFr5I_tQizGUcLX5L6PSiIdKQroTJgov8ArNxRlKL8/s1600/marvel-super-heroes-secret-wars-battleworld-holacomic.jpeg",
        issueIds: null,
      },
      {
        comicId: "g-o-d-s",
        name: "G.O.D.S. ",
        coverImg:
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjTbZQBsDwVg7kt7LdfGbAirpMWn4SzdDKr_dExLceLoLDoLj-8U7KmLV9Lj2mCmsMgZPB7wk5L-UWK5pjzqib0lyV5F3rhI2ydWaIxC_LMi57t_v1SrhyKgzf7K-qD1cG55mk9jc8B6JuWdgSOA2V_6SleZ4y6kJGFgvRAY0IiHetAb-YaPlT6-T9mEAI/s1600/G.O.D.S.-holacomic.jpeg",
        issueIds: null,
      },
      {
        comicId: "captain-marvel-2023",
        name: "Captain Marvel (2023) ",
        coverImg:
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjmnp2tZBiMlwQJXjYJE0d7WmX2TDXC6nz5NBobVpRZgiKUyyROK_HYAB81kvVBIC_riT8at1VRNcCSBjFvGsBqNwDDVl1wqzJl8BBofKgip6OCJzEU2z7hpTE4f4T-1S6glMM7CGn29vPSPhu5GzmpvCQNwbiCrbn8jA3eyFNbWoFy0JaK1ePZ0oeGdw8/s1600/captain-marvel-2023-holacomic.jpeg",
        issueIds: null,
      },
      {
        comicId: "x-force-2019-2",
        name: "X-Force (2019) ",
        coverImg:
          "https://1.bp.blogspot.com/-ykBD9TdXBQI/XcP4Phe78BI/AAAAAAAASKY/yXTT9nvQYkgLzkY6kvMqI1etFGoOwCTzACLcBGAsYHQ/s1600/X-Force%2B%25282019%2529-min.jpg",
        issueIds: null,
      },
      {
        comicId: "spider-woman-2023",
        name: "Spider-Woman (2023) ",
        coverImg:
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgjxNjolMHDJixKt45e-ebCVZKoZsfhHW1835iIFp-LDfQbFg0-RLvlXdFrg6kSwMklFtachtSH_IhhreEEPrLdijmQzdWg_qYAMhwogUVlaRmNT0gx7XP_G6Y5lwxAdRG6ARsSyk2EDQpuPzIwvkZcJ_Al1EfSM6Jsf8C9jS6Fkl9Yv76ZwU6uFIDoBeI/s1600/spider-woman-2023-holacomic.jpeg",
        issueIds: null,
      },
      {
        comicId: "ultimate-spider-man-2024",
        name: "Ultimate Spider-Man (2024) ",
        coverImg:
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhnGw-ANbLSNKquLNJKGmD6MyUhDmRAPf80J5MYA0_dXaSNpO_IsKEgfRUWM40M80OBWrDSRZCdPS9J6XW7qH0gEBpN7OZDyYI7kglOaHpfd5sl__dcVkPpJ1yQ5Ubsis_JiarLDJKrECIfm6pxTZ0gw_aoT-F1QA4YM-4X2dKbQrc5ehdnkLdxA-Oc8Jc/s1600/ultimate-spider-man-2024-mycomiclist.jpeg",
        issueIds: null,
      },
      {
        comicId: "rise-of-the-powers-of-x",
        name: "Rise of the Powers of X ",
        coverImg:
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgdkRFMaNuwIEtlwvBNQOu3Vo8gT9OKdo3RunNvq1zaGt1FVV8pLcf6k8RgRugAddpMn02u6gKwC7gddNX22dl_3hsG3sEpN8ZBrohJVncH6UNWPjLFKOzPYFboW8JvNDdU96CrhIhm8EL42OWSblstFNUFsnGrp8j5aLUlBl7EWZlmf6CC3eOLyGpqgpo/s1600/rise-of-the-powers-of-x-mycomiclist.jpeg",
        issueIds: null,
      },
      {
        comicId: "sentry-2023",
        name: "Sentry (2023) ",
        coverImg:
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhZbkVwFapjUHRzKVLqFTIFB9i72GileYXaQymGZ3ENSv5Ad_L5q6QJpDeokqRE1JF5oAyIt45XAoUzti4_ChPDj905EzqozG8CimH3KiOsyTd6_kUZKHfYFWngPhPTmIno2DKiyCLoN-CWL_wVCGgg_2H-62T0djdt2ocad1j1HbTORfV7B3KhPoV2qBo/s1600/sentry-2023-holacomic.jpeg",
        issueIds: null,
      },
      {
        comicId: "fire-power",
        name: "Fire Power ",
        coverImg: "https://1.bp.blogspot.com/-_NwC3GjjAYY/XytU0Ltcy9I/AAAAAAAAiXc/qghbq8Kj7Pc9CotIVls0CDpBsdD4NeCdQCLcBGAsYHQ/s0/optimized-sr8z.jpg",
        issueIds: null,
      },
      {
        comicId: "superman-vs-meshi",
        name: "Superman vs. Meshi ",
        coverImg:
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgHk41kMZ7HiHt4UVcvulA_nEXohjGruCJpphH_zOwEXErzWGa1oYDHTypV9dvZdUiSuIksDB9uU5W8VyirTy2gCMq63-3JWvmHw3ssB0CyPDQYNO639tt6GInUNjHliXEFOjPBX1jWkASjW6TuyPzeAXTpqwH-AbvZaKn1JQAWKwo9VLBKBU9YOKvvC2I/s1600/Superman%20vs.%20Meshi-holacomic.jpeg",
        issueIds: null,
      },
      {
        comicId: "2000-ad",
        name: "2000 AD ",
        coverImg:
          "https://1.bp.blogspot.com/-WCOziMM-A9c/Xl8N7WIfK5I/AAAAAAAAVSE/JXeJxqSHH9YTFsyhPuTx9SDN6RNX181twCLcBGAsYHQ/s1600/2000%2BAD-min.jpg",
        issueIds: null,
      },
      {
        comicId: "judge-dredd-megazine-vol-5",
        name: "Judge Dredd Megazine (Vol.5) ",
        coverImg:
          "https://1.bp.blogspot.com/-U4VOVf_-DcE/Wta6W1QZBNI/AAAAAAAAAn0/B9lrYGS9JLUQuJ2f7BV94GwPZfIEfJmngCLcBGAs/s1600/judge_dredd_megazine_qMNZe.jpg",
        issueIds: null,
      },
      {
        comicId: "spider-boy-2024",
        name: "Spider-Boy (2024) ",
        coverImg:
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj8HhC1OVG8KfmrPeuDdGowd_sokUCDqwYGBnR4zIzoxQDfrTZw4jSbiv4TPBoC2-0j-JbV1lskRGymjqicClzAb9PnM7zIEZYAmqppaeaQqcj_rYPkq-1SAbMlPS-Jo-qvoq_aj3qhaGVAmlmFXN1ZZielcjZfGp1BPAWmP8eycQBFqRCpgpNgpSpBNnw/s1600/spider-boy-2024-holacomic.jpeg",
        issueIds: null,
      },
      {
        comicId: "edge-of-spider-verse-2024",
        name: "Edge of Spider-Verse (2024) ",
        coverImg:
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgjTbV2gYj_A_Yb6ILCxVkFZbWD0jVVOORhDmOOhVnGVWdS-qCH6E9NDqqLjSavs44-K4bczpC4pmSmjdv4mOCYxRHGDBSWnG4kwli_DLPMgV9UM7j6isHGZRHBcJPoMb4LBlYaanRbEnyomHwk0Xc3YU_mpm98F687IjIbd4EzTC7tFoDKtYODbZ2lUXQ/s1600/edge-of-spider-verse-2024--mycomiclist.jpeg",
        issueIds: null,
      },
      {
        comicId: "star-trek-2022",
        name: "Star Trek (2022) ",
        coverImg:
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhIXTDNTMDEN6J0EWcbAmscEa9qu8fwz9bV2FpA6LBylqkkANhWQ8bJjd_jENiz5G7CoCyjotWonOq6XKCw-cPOE71F8Zon7-4lsYy7-4yTQHPduLgFjj1Edp4B-Nla7YN1fT2iIAYbrB4QK7k4Ov4-4TmsLl9NSahKdMwMhqn8OlJmfL2gK73OsSUM/s1600/Star%20Trek%20(2022)-min.jpeg",
        issueIds: null,
      },
      {
        comicId: "cobra-commander",
        name: "Cobra Commander ",
        coverImg:
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiJxLQK86e1bACnfKrfJx7U3U-mfswgYv1872VX1HFeCFS2i_kjzrXySW5X53pLLatNCCNTvCy7poxPaXKD9wJWH5nJ4u5s8r0kbvH5aHnZrKxqupR2540JGl9-Hdo6lJWmw6yzC65hopJYu4er7xJIYSvU7Js666CawuBET1XPgft97FSqsCIEaiSsUkc/s1600/cobra-commander-mycomiclist.jpeg",
        issueIds: null,
      },
      {
        comicId: "g-i-joe-a-real-american-hero",
        name: "G.I. Joe: A Real American Hero ",
        coverImg:
          "https://1.bp.blogspot.com/-9obOVAKpAHs/XZ4BKl-6u5I/AAAAAAAARbs/eEMkuDActGspMSIEmA3IteXr_7hQu5CFACLcBGAsYHQ/s1600/optimized-lnkl.jpg",
        issueIds: null,
      },
      {
        comicId: "wonder-woman-2023",
        name: "Wonder Woman (2023) ",
        coverImg:
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEivnTnnW4eo6Jzthi9fb5jwhs9ZsaXfryTBMn4cg1GKihrC2Tw7Xnr8Eg93O7yLxUz1KDC-6jNIUoKbAJ5OCBxM3vP48_AcbmY0AXY1o9ULdgSMU24pItHdOiZV0iF0ZJ4iVvQYuAOWWWxf6c2cSaCrQjSIYugLrtf0icqlFF34FsALkxNnslfTAHuLTJM/s1600/Wonder%20Woman%20(2023)-holacomic.jpeg",
        issueIds: null,
      },
      {
        comicId: "catwoman-2018",
        name: "Catwoman (2018) ",
        coverImg: "https://1.bp.blogspot.com/-MRQhFGspdX0/WzyzI2bg4JI/AAAAAAAADLk/yAw-U7icbWccktt4-WHT9qCFkwYpTFNVACLcBGAs/s1600/catwoman__2018_.jpg",
        issueIds: null,
      },
      {
        comicId: "new-fun",
        name: "New Fun ",
        coverImg: "https://3.bp.blogspot.com/-zIDIUkFhjI8/XKymYg9CPwI/AAAAAAAAMtM/YT2UPbZ8qL8Caf5kRPpYecZwFZtqMgvEQCLcBGAs/s1600/New%2BFun-min.jpg",
        issueIds: null,
      },
      {
        comicId: "nightwing-2016",
        name: "Nightwing (2016) ",
        coverImg:
          "https://1.bp.blogspot.com/-U-utw_1UNdQ/XYIX_02f8NI/AAAAAAAAQoE/X2rmW8sGzrM9Kb510j5zs0V1HUxdo66oQCLcBGAsYHQ/s1600/optimized-olnw.jpg",
        issueIds: null,
      },
      {
        comicId: "titans-2023",
        name: "Titans (2023) ",
        coverImg:
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhr6Zx9ZFavvx4N8g55Ala3CxQ_qP_5x-nCo2v7QQMQfr2kdes7-0ue6OZoonbe7DEr5nG08wFK9kZ2ZOAWe0Ktd8_fI5NHUM9kGqjlJJFEKtu1Vl8SgS8u-DP4vkYuEYOspxXZnwkxtQnzl0PuXRUuXx3qpwcK1JbdUsJPFURfVfaFa9gx5TvYMHn0/s1600/Titans%20(2023)-holacomic.jpeg",
        issueIds: null,
      },
      {
        comicId: "superman-2023",
        name: "Superman (2023) ",
        coverImg:
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiwKfd3HDquBjIvtyoKIehJra-RqCh0lj_Bt5BFOnjz8F-rC2uZwR_k0nVYtaDSdS7HtCsjPCgQJlm08vB5vfym5KvpmLmBip7_58Ky7f2pcmQDZXpv5-FYADNgtuKPrQ_ZsREposhZx2kg5M-VIZHYVE3FpmkU3t0bdFu4qFiYrZrdIX0orVHhAvBc/s1600/Superman%20(2023)-min.jpeg",
        issueIds: null,
      },
    ],
    currentPage: 1,
    maxPage: 7,
  },
  pageNumber: null,
  maxPage: null,
};

export const issueResponse = {
  issueId: "31",
  comicId: "venom-2018",
  pages: [
    "https://2.bp.blogspot.com/BCGmUja2LGTkSptE-ZcyTBoxFpTcVSyXgjha20JARf5EzmAdXnf4QzaMjGgnK5xzb9Z-tOqohua6ahANHgp9zFzSen1cohTwGoZ9WEbEYIkaRxWc9rUGVvlQL_AMaP_Tl11Jij1ePw=s1600",
    "https://2.bp.blogspot.com/IIRps0vlJaB3Mvk5BQcWrcb48IntouAwjYO7Qwtkcy7YSZFOjE1c9QoiiwWQi_W7Tiq39bFifxihg_ctIwVUPq2CnME89ugMkSaGYRRQGQKI3vBngmgQU-K2NprUBpAIw1ImxBhJ5g=s1600",
    "https://2.bp.blogspot.com/noOgvQ-QrRZdjOfJP-EtSsUii-hQX-smYi66J3tEuX345DfJ6mDeIl5SrWipym7BoJmP6T137Tuwva0QHl1NWlrp69AxXGdAcVge3ZTGjdoUSLcspmbmsRBkOYcGQjr8F0X89NNGxg=s1600",
    "https://2.bp.blogspot.com/BzOM3TicBtCZdlsLHROnVENQnA909ZZZWzILnpTcANXP0gwb4wpFDKJDISr--jW7k20Map1sL_Sq2S54Myr6AV61SxCYiHoBFQrFfrCxl3n6bXA8dluahsKaoFNQ6E800N9kwvSJgg=s1600",
    "https://2.bp.blogspot.com/T9OVS4YI201Md7p7pFcab2tEG0GSerQVMCAa8a6BeXrnx_7rPjR5UFp3B2VLnLNhFQkQCbXtCNOpmHFlq_9_GliC1iGe1hgy2CLBgfvkzv0yChl2nb1hmlL00eDXhrlleKGYOjs7JQ=s1600",
    "https://2.bp.blogspot.com/2RkphY0VjP3uH_cjRoUoKAkcrUS5Vwwo4Rrw0wY6Ggo7dMZ3S11lO_WmHoHtLFjSYogZzmBOIm3fP5ZCPy3JL4hnGr2W0LlTNz1xC8QGPTFhDMp1HxBgOVAGAVuspeoe1ZP4ttHbLw=s1600",
    "https://2.bp.blogspot.com/deVdZ-mijFFhZ1WqagpVodI3CRVh_LU4xCudwEE8R9Y5VJEgNRTG1_nQuWtA8imr_mtMVShZ5542dRiLAZfBFD5-Q6wr8lZegN6iix2AZNcbzQRhgiUyVUO62yc6wkk-dkN1NUfIeQ=s1600",
    "https://2.bp.blogspot.com/JcInj2XuZMFXW4f9MBOp0bm59xcvPtLwArE5THCw8m5QNOZMBVfhv-XesEttSqQ_Xluttnm5ySTECOei3xgsr37U_xaDsg3zia0c0hmGZYRp-y_a4GoKJhOFE3Vwo81JAkUDIZcT8A=s1600",
    "https://2.bp.blogspot.com/pOFPyNDJuOFF4jYL834hIc8Gq7nqpya0hHtRDN4figb9RZFAneYmfrp1KSo7LXWPLORcvnyoFVPopt92rxrBsAR0WfLWhWjn_KaAPCQrNQhhozJoYBky3xOcVcsrMv_4AujghD1HLg=s1600",
    "https://2.bp.blogspot.com/7UmQZqyph4Ae8Xp_BQ4ltY6wftY7RQ53J8XeXSdxdUJi9rknrwh1BllIOpT6omkYUUrWDfTXBUt-czgAtVOV2ZSIEjRrAdGAYaov4AiCBPIiSapCjRuXjOWLLT_qIX7F0mt70j7ILg=s1600",
    "https://2.bp.blogspot.com/OubClS6hN-OzsYd8Hz3kWdNTmY5xTZNbJlO5dezW8vRz-Pg4z86g83jRf_99Iu5NBxnZrJcBKpPQl0Znd83JRCUtZoc1sasXmy8rdj0e1QyNep4IjAwAITkKrRV9fdx8UwqfY40TAw=s1600",
    "https://2.bp.blogspot.com/Y2q0AAex3G-cH7Y9LWTvkNCapy-8fUF_FHnCaDjR_mbzG1kkzwcF4v-qyDKAA2ms70j0PZbP3TtCsCZNKsPXZ7vf6kT08nXG-QCvcLl8PruWV-Q698qCIdAkuJjpniHVQMRTGiIl3g=s1600",
    "https://2.bp.blogspot.com/eytxm58XHgN078ABTgqblxZA7RQ_hg9UqtQEMMZQj0zlaPr1iRRtTMmna2f9UZ8EWNZ2h1jsBIP4ssmESkZKM2IM8TdfTrJDdHASKKbo7NWCK6Fe5RhuRBPcJPwKSQSVZAIYy1rYig=s1600",
    "https://2.bp.blogspot.com/j98pC91Gj1bR4XAUoiOOIsnl1NkCKoBwBjTnTxBNXDidz3XSgiY-ZtFhEutlYGR5KhLdcsoB3hrWFjpem5577HhQoP7-iRHFNyO5GIM_KF_9X30F8hRCte2f0BtT8-8nOjh3zn1Efw=s1600",
    "https://2.bp.blogspot.com/nNzT5LXyMvBzQ3nVJyzXoSG0W8shyPJhR4qqypOiij8kM3o3P1gKG3mx7dG8SKMvpb-Tp2uXK_PbfFDSwob0bslUGG5Awh_aBI9iT7Axr8OYqv76qTBR_HcTgvM5geB0OZuPdFR6cA=s1600",
    "https://2.bp.blogspot.com/fLsuMC7Hz4WXpCJglBVvwSX-3tLP9CCcJBJAXbkT3y0Rsv4izhkjAhmGMRK08a4Eeq_My2Pw4t1gFHCgS71BeEFYpOOSk_FvsImqmfBg7TBKCQVyo_KxpzL1UFu7bN61l_gXNPMJ3w=s1600",
    "https://2.bp.blogspot.com/yQZbBPUxnA2x7LXC9lYW4w3NVEGFoo2WnAvLDXHl_m1DNEqP08BDXz0b574BNGaos3zWyd28Y4HdfxmH3Ipjk0E6ujf677w2o5rBDHxW2K9mZ1-U1S5YYZaOJ7aU8y6UnlpNm0f1Kw=s1600",
    "https://2.bp.blogspot.com/5ncMVM00BxoER_iBIsLsUNVcN6MiQ20F8kYFu9MGFGfE75qUCh6QNsDuudz55n0zVXN2lUQmuYH4Or0oR8srRK0_jky9iFcwV1Hxz8whsjRUrQ9IOBNTB8_bwC1Bnb_ZGBVydFh62Q=s1600",
    "https://2.bp.blogspot.com/btQ4UY3fFdhZPnUmEdGwqqq79ujLiGYncPZs7uMeTkvyGGo4urAzDfEBOVgTIahPslAvZpEQTv2U53UKOqH2R5hAc2YDj0er6Qie4irPXx4t8w-qzvchAGIYozKeU0wJNnpIa0BMEg=s1600",
    "https://2.bp.blogspot.com/JquMm-Juhxqq2t75C1vaNHcZEHavxtyxG35IdfM5Dq3uMEW_wHbjafdlPr_ixSqKnMT1t_oBsPZXN8jyTXIL-XV5W5r0JzCP1SOhTkTP-4HJE7S3n0iVSr3ocfurtKt4bxks2Arc2Q=s1600",
    "https://2.bp.blogspot.com/B_KsLMMvQfMxKmqyJqMy_yrITCZdwIvmrr80eXP6H-MWqAj2i98c4zvVtnrkxC4Uh1vPpmDVMOOiyibSRnIO4flK7NwSuu71rAQgzUs_5MK_1ZAs4PGNbxzK3MUfbar_Yiy7Dy9ReA=s1600",
    "https://2.bp.blogspot.com/R7dqK3X_BhlZR6nZpZGnYZKB9rdviKpcIFd9IZ9QyBkmDdwwMadQXyVr7ymWszAbRNTd4Ua6PRcSFIxWByCuWGj4p3dBPLNn8h4_aGnaCIxZyC4ALP8Adj_92TIjjMCu0oaMVkE0Yw=s1600",
  ],
};

export const infoResponse = {
  patchNotes: ["Adjust UI to better display which issues have been read", "Improve overall performance", "Change UI of creating a reading list"],
  version: "Beta 1.1",
  downloadLink: "https://github.com/CalvinPVIII/ComicCompanion.Solution/releases/download/1.0-beta/comiccompanionv1.1-beta.apk",
};
