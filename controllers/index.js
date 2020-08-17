exports.me = (req, res) => {
  return res.json({
    main_heading: 'This is JS-ramverk',
    paragraph0: {
      // eslint-disable-next-line quotes
      text: "I'm Richard and this is the first page for the course",
      link: {
        text: 'jsramverk',
        url: 'https://www.jsramverk.se/',
      },
    },
    paragraph1: {
      text: `I am currently ${
        new Date().getFullYear() - 1986
      } years old and residing in Helsingborg.`,
    },
    github_avatar: {
      url:
        'https://avatars1.githubusercontent.com/u/31686265?s=460&u=b237572a2ca661ec50a7e2a4ce362d3ce67e751f&v=4',
    },
    paragraph2: {
      first_part: {
        text:
          'I have been studying web development remotely for a few years now, both part time and full time while working full time. I started studying remotely in 2014, starting out with the introductory Python course at ',
        link: {
          text: 'Blekinge Tekniska Högskola',
          url: 'https://www.bth.se',
        },
      },
      second_part: {
        text:
          '(BTH). I have since studied a few MOOCS at Coursera and EDX while also finishing more than half of the curriculum at FreeCodeCamp. I also did a term at EC-utbildning (frontend developer) in Helsingborg while working part time for a short while. I decided to continue with remote studies when I got full time employment shortly after starting at EC.',
      },
    },
    paragraph3: {
      first_part: {
        text: 'Since 2018 I have studied the "course package" ',
        link: {
          url: 'https://www.bth.se/kurspaket/KP667/20202/',
          text: 'Webbprogrammering och Databaser',
        },
      },
      second_part: {
        text: ' and in 2019 I started studying the full ',
        link: {
          text: 'program',
          url: 'https://www.bth.se/utbildning/program/pagwg/',
        },
      },
      third_part: {
        text:
          '. Right now I have completed enough points for almost one year (I have a few points here and there to collect from the first year).',
      },
    },
    paragraph4: {
      text:
        'While studying at BTH I have also been studying other courses at other swedish universities such as Umeå Universitet and Uppsala Universitet.',
    },
    paragraph5: {
      first_part: {
        text: 'During this last last summer I have been hard at work studying ',
        link: {
          text: 'Fullstack Open',
          url: 'https://www.fullstackopen.com/en',
        },
      },
      second_part: {
        text:
          'and at the moment I have completed the first 7 parts of the program and I am looking forward to continue with the GraphQL and TypeScript parts as time permits during the fall.',
      },
    },
    paragraph6: {
      first_part: {
        text:
          // eslint-disable-next-line quotes
          "I also recently found a very interesting book at O'Reilly which is called ",
        link: {
          text: 'JavaScript Everywhere',
          url:
            'https://www.oreilly.com/library/view/javascript-everywhere/9781492046974/',
        },
      },
      second_part: {
        text: 'that I also plan to go through as time permits during the fall.',
      },
    },

    paragraph7: {
      text: 'I am looking forward to diving into more JavaScript frameworks.',
    },
  })
}
