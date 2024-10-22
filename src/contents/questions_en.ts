export interface Question {
  questionId: number;
  question: string;
  choices: string[];
  explanations: {
    type: 'plane' | 'note';
    heading?: string;
    paragraphs: string[];
  }[];
  correctAnswerNumber: number;
  reference?: {
    href: string;
    label: string;
  };
}

const questions: Question[] = [
  {
    questionId: 1,
    question: 'Which of the following is the purpose of the Copyright Act?',
    choices: [
      'Limit the rights of authors and promote the unrestricted use of cultural products.',
      'To contribute to cultural development by protecting the rights of authors, etc., and paying attention to the fair exploitation of these cultural products.',
      'To curtail cultural development and minimize the rights of authors.',
      'Encouraging unauthorized reproduction of copyrighted works and disregarding the rights of authors.',
    ],
    explanations: [
      {
        type: 'plane',
        paragraphs: ['The purpose of the Copyright Act is stated in Article 1 of the Copyright Act.'],
      },
      {
        type: 'note',
        heading: 'Article 1',
        paragraphs: [
          "The purpose of this Act is to provide for authors' rights and neighboring rights with respect to works, as well as with respect to performances, phonograms, broadcasts, and cablecasts, and to ensure protection for the rights of authors and other such persons while according attention to the fair exploitation of these cultural products, and thereby to contribute to cultural development.",
        ],
      },
    ],
    correctAnswerNumber: 2,
    reference: {
      href: '/en/basis/',
      label: 'Understanding Copyright in Classes: 1-01',
    },
  },
  {
    questionId: 2,
    question: 'Which of the following is a "copyrighted work" under the Copyright Act?',
    choices: [
      'Arrangement of stars in the universe.',
      'Facts reported in news articles about car accidents.',
      'Songs improvised and sung by elementary school students.',
      'Surveillance camera footage.',
    ],
    explanations: [
      {
        type: 'plane',
        paragraphs: ['The definition of "work" in the Copyright Act is found in Article 2(1)(i) of the Copyright Act.'],
      },
      {
        type: 'note',
        heading: 'Article 2(1)(i)',
        paragraphs: [
          'A "work" means a creatively produced expression of thoughts or sentiments that falls within the literary, academic, artistic, or musical domain.',
        ],
      },
      {
        type: 'plane',
        paragraphs: [
          'Numbers 1. and 2. are mere facts so these do not qualify as copyrighted works.',
          ' Number 4. is not a "creative" expression and does not qualify as a copyrighted work, since it is merely a recording of facts without room for the photographer\'s thoughts or sentiments to be expressed.',
        ],
      },
    ],
    correctAnswerNumber: 3,
    reference: {
      href: '/en/basis02/',
      label: 'Understanding Copyright in Classes: 1-02',
    },
  },
  {
    questionId: 3,
    question: 'Which of the following could be "corporate work" under the Copyright Act?',
    choices: [
      "A novel written by an individual at home and published under the individual's name.",
      'A logo design created by a designer working for a design company at work and published under the name of the company.',
      'An application created by an engineer working for an IT company as a hobby and published under their name.',
      'Photographs taken by freelance photographers based on a request and published under the name of the company that commissioned them.',
    ],
    explanations: [
      {
        type: 'plane',
        paragraphs: [
          'For a work to be corporate work, it must be created by an employee "in the course of duty" and be published under the name of the corporation or the like. Therefore, the case of publication under the name of an individual is not applicable. In the case of a program work, the name of the publication is not required, but the work must be created by an employee "in the course of duty" such as a corporation.',
          'Number 3. does not meet the requirement.',
          'Number 4. does not apply either, since the person is not engaged in the business of the corporation (Article 15).',
        ],
      },
    ],
    correctAnswerNumber: 2,
    reference: {
      href: '/en/basis03/',
      label: 'Understanding Copyright in Classes: 1-03',
    },
  },
  {
    questionId: 4,
    question:
      'For the graduation project of one elementary school class, we all created one large picture. This kind of picture is called "joint work".\nWhich of the following statements is true regarding joint works?',
    choices: [
      'The copyright in a joint work is shared by all persons jointly involved in its creation.',
      'Copyright in a part of a joint work is held only by the person who created that part.',
      'For the use of joint work, the permission of only one of the joint authors is sufficient.',
      'A joint work falls under this category only if the creative parts of each co-author are clearly distinguishable.',
    ],
    explanations: [
      {
        type: 'plane',
        paragraphs: [
          'A joint work is defined in Article 2(1)(xii) of the Copyright Act as a work that a person creates by translating, composing a musical arrangement of, reformulating, dramatizing, making a cinematographic adaptation of, or otherwise adapting a pre-existing work. As stipulated in Article 64 for moral rights and Article 65(2) for joint copyrights, one copyright owner cannot exercise their rights without the agreement of all the parties.',
        ],
      },
    ],
    correctAnswerNumber: 1,
    reference: {
      href: '/en/basis03/',
      label: 'Understanding Copyright in Classes: 1-03',
    },
  },
  {
    questionId: 5,
    question:
      'Which of the following constitutes an infringement of the "publication right", one of the moral rights under the Copyright Act?',
    choices: [
      'University faculty members used their books in their classes and distributed them to students.',
      'A student read a book from the library to a friend.',
      "A university faculty member posted a student's unpublished paper on the Internet without permission.",
      "A high school teacher posted his work on the school's website.",
    ],
    explanations: [
      {
        type: 'plane',
        paragraphs: [
          'As stipulated in Article 18 of the Copyright Act, a publication right is the right of the author to decide when and in what form to publish their unpublished work, and others are not allowed to publish it without permission.',
        ],
      },
    ],
    correctAnswerNumber: 3,
    reference: {
      href: '/en/basis04/',
      label: 'Understanding Copyright in Classes: 1-04',
    },
  },
  {
    questionId: 6,
    question: 'Which of the following rights is not defined in the Copyright Act?',
    choices: ['Distribution right (movie).', 'Neighboring right.', 'Trademark right.', 'Integrity right.'],
    explanations: [
      {
        type: 'plane',
        paragraphs: ['Trademark rights are defined in the Trademark Act.'],
      },
    ],
    correctAnswerNumber: 3,
  },
  {
    questionId: 7,
    question: 'Which of the following explanations is incorrect?',
    choices: [
      'A rent out right is the right to make a copyrighted work available to the public by transfer of a copy of the copyrighted work.',
      'The adaptation right is the right to adapt a work by translating, arranging, transforming, adapting, or making a film of it.',
      'The exhibition right is the right to publicly display a work of art or a work of photography that has not yet been published by these original works.',
      'A public transmission right is the right to make a public transmission (including making transmittable in the case of automatic public transmission) of the copyrighted work.',
    ],
    explanations: [
      {
        type: 'plane',
        paragraphs: [
          'A rent out right is "the exclusive right to make that work available to the public by renting out copies of the work" (Article 26-3). ',
          'Number 1. is incorrect because it says "by transfer".',
        ],
      },
    ],
    correctAnswerNumber: 1,
  },
  {
    questionId: 8,
    question:
      'What is the term used when an author retains rights to their copyrighted work but allows others to use it under certain conditions?',
    choices: ['Public domain.', 'License.', 'Copyright notice.', 'Limitation of rights.'],
    explanations: [
      {
        type: 'plane',
        paragraphs: [
          'Number 1. is a work for which the copyright protection term has expired or the copyright owner has abandoned their rights.',
          "Number 3. is a mark like (C) with the copyright owner's information after the notice.",
          'Number 4. means provisions in the Copyright Act that limit the rights of copyright owners based on certain requirements.',
          'Therefore, number 2. is correct.',
        ],
      },
    ],
    correctAnswerNumber: 2,
    reference: {
      href: '/en/basis04/',
      label: 'Understanding Copyright in Classes: 1-04',
    },
  },
  {
    questionId: 9,
    question:
      'For the following description of the protection term of copyrights or neighboring rights, choose the incorrect one.',
    choices: [
      "From the time of creation of the work to 70 years after the author's death.",
      '70 years from the time of publication of a work for cinematographic works.',
      'The record is 50 years from the time of recording.',
      '50 years from the time of broadcast for a broadcasting or cable broadcasting.',
    ],
    explanations: [
      {
        type: 'plane',
        paragraphs: [
          'The protection term for phonograms is 70 years from the time of sound fixation (sound recording) after the time the phonogram is published (Article 101(2)(ii)).',
        ],
      },
    ],
    correctAnswerNumber: 3,
    reference: {
      href: '/en/basis04/#ref23',
      label: 'Understanding Copyright in Classes: 1-04 Protection Term',
    },
  },
  {
    questionId: 10,
    question: 'Which of the following does not constitute copyright infringement if done without permission?',
    choices: [
      'Posting slide materials used in the lecture on social networking sites.',
      'Copying DVDs from the library and giving them to your friends.',
      'Publishing drawings on your blog that you have made in the style of professional illustrators.',
      "Reproducing portions of the publisher's textbooks as teaching materials for teachers to distribute to students for a fee.",
    ],
    explanations: [
      {
        type: 'plane',
        paragraphs: ['The style of a drawing/painting is like an idea and is not copyrighted.'],
      },
    ],
    correctAnswerNumber: 3,
  },
  {
    questionId: 11,
    question:
      'Which of the following acts, if done without the permission of the copyright owner, would not be a "citation" under the Copyright Act?',
    choices: [
      'The student included a portion of the web article in brackets in the report and stated the source of the article.',
      "A professor included one of the figures in another person's research paper in its entirety in their paper and stated the source of the figure.",
      "The teacher included some of last year's student submissions in this year's class materials, clearly indicating their source.",
      'A student described a certain tanka poem in its entirety in their presentation material and clearly stated its source.',
    ],
    explanations: [
      {
        type: 'plane',
        paragraphs: [
          'As stipulated in Article 32(1) of the Copyright Act, a copyrighted work must be a "published work".',
          'Merely submitting the copyrighted work to the teacher by the student does not constitute "publication" (Article 4), so a user cannot cite the copyrighted work.',
        ],
      },
    ],
    correctAnswerNumber: 3,
    reference: {
      href: '/en/copyright02/',
      label: 'Understanding Copyright in Classes: 2-02',
    },
  },
  {
    questionId: 12,
    question:
      'Which of the following rights is not specified in Article 35(1) of the Copyright Act as a limitation of rights?',
    choices: [
      'Reproduction right.',
      'Public transmission right.',
      'Public communication right.',
      'On-screen presentation right.',
    ],
    explanations: [
      {
        type: 'plane',
        paragraphs: [
          'Article 35(1) of the Copyright Act provides for limitations on reproduction, public transmission, and public communication.',
        ],
      },
    ],
    correctAnswerNumber: 4,
    reference: {
      href: '/en/copyright03/',
      label: 'Understanding Copyright in Classes: 2-03',
    },
  },
  {
    questionId: 13,
    question:
      'Which of the following does not constitute "classes" under the Guidelines for Article 35 of the Copyright Act?',
    choices: [
      'Elementary School Homerooms.',
      'High School Entrance Ceremony.',
      'Mock classes at university open campuses.',
      'University Public Lectures.',
    ],
    explanations: [
      {
        type: 'plane',
        paragraphs: [
          'According to the Guidelines, "special activities" in elementary and secondary education fall under the category of "classes". Therefore, numbers 1. and 2. are "classes".',
          'Since it is stated that open lectures at universities are also "classes" and number 3. is listed as an example that does not apply, number 3. is the correct answer.',
        ],
      },
    ],
    correctAnswerNumber: 3,
    reference: {
      href: '/en/copyright04/',
      label: 'Understanding Copyright in Classes: 2-04',
    },
  },
  {
    questionId: 14,
    question:
      'Which of the following acts, if committed without the permission of the copyright owner, would not be covered by Article 35(1) of the Copyright Act?',
    choices: [
      'In a class where teachers taught students about disasters, they printed out professionally taken photos of disasters and distributed them to all the students in the class.',
      'A high school student drew a picture of Pikachu on a class signboard at a cultural festival.',
      'The college students used a hit song for a dance club presentation for which they charged an admission fee.',
      'A university professor showed part of a well-known movie in an online class, and students discussed its content.',
    ],
    explanations: [
      {
        type: 'plane',
        paragraphs: [
          'For number 1., the limitation on the reproduction right under Article 35(1) can apply (Article 47-7 applies to the distribution of reproductions).',
          'As for number 2., the Guidelines state that special activities in elementary and secondary education institutions are "classes" under Article 35(1), so cultural festivals are also "classes" and can be reproduced.',
          'Regarding number 3., Article 35(1) cannot apply because circle activities at a university do not constitute "classes" under Article 35(1). In addition, since an admission fee is charged, the non-profit screening under Article 38(1) is also inapplicable, and the permission of the copyright owner is required.',
          'As for number 4., Article 35(1) can apply since a part of the film is publicly transmitted within the online class. In addition, there may be room for a citation under Article 32(1).',
        ],
      },
    ],
    correctAnswerNumber: 3,
  },
  {
    questionId: 15,
    question:
      'Which of the following is an example of what can be done without the permission of the copyright owner under the Copyright Act?',
    choices: [
      'A teacher copies an entire textbook sold by a publisher as a teaching aid and distributes it to all students in the class.',
      'To show students a newspaper article in class, the teacher copies the relevant section and displays it on a projector.',
      "A university professor publishes a portion of a student's unpublished paper.",
      'A university professor publishes their article with co-authors in their book with alterations.',
    ],
    explanations: [
      {
        type: 'plane',
        paragraphs: [
          'As for number 1., it should originally be purchased and used, and it would unreasonably prejudice the interests of the copyright owner (proviso of Article 35(1)). Therefore, Article 35(1) cannot apply.',
          'For number 2., the limitations on rights under Articles 35(1) and 38(1) can apply.',
          "For number 3., the student's permission is required, as a user cannot cite unpublished papers (Article 32(1)).",
          'As for number 4., in joint copyright, a co-owner cannot modify it without the agreement of the other co-owners (Article 64(1)). In a joint copyright, a co-owner cannot exercise the right without the agreement of the other co-owners (Article 65(2)).',
        ],
      },
    ],
    correctAnswerNumber: 2,
  },
  {
    questionId: 16,
    question: 'Which of the following is not a requirement for a "citation" under the Copyright Act?',
    choices: [
      'The copyrighted work to be cited must be published.',
      'The citation must be inevitable.',
      'The copyrighted work must be primarily your work and the cited portion must be secondary, both in terms of quality and quantity.',
      'The cited passage is clearly indicated by brackets or delimiters.',
    ],
    explanations: [
      {
        type: 'plane',
        paragraphs: [
          'Regarding number 2., some people believe that the inevitableness of citation is required, but the currently accepted view is that it is not an independent requirement.  Article 32(1) requires that the citation be "consistent with fair practices and within a scope that is justified for the purpose of news reporting, critique, study, or other place in which the work is quoted", but does not require the inevitableness of citation.',
        ],
      },
    ],
    correctAnswerNumber: 2,
  },
  {
    questionId: 17,
    question: 'Which statement is correct about "citation" in the Copyright Act?',
    choices: [
      'Reproduction for commercial purposes is not a "citation".',
      'In the case of explanatory materials, you may simplify the wording for clarity and "cite" the material.',
      'A copyrighted work may not be "cited" to criticize the original work.',
      'A copyrighted work may be translated when "citation" is necessary.',
    ],
    explanations: [
      {
        type: 'plane',
        paragraphs: [
          'Article 47-6(1)(ii) of the Copyright Act stipulates that a copyrighted work may be translated if it can be used under Article 32.',
        ],
      },
    ],
    correctAnswerNumber: 4,
  },
  {
    questionId: 18,
    question: 'Which of the following applies to public communication?',
    choices: [
      'Recording a TV program and showing part of it on the classroom projector.',
      'Recording TV programs and distributing some of them on the LMS.',
      'Showing a video playing on a video-sharing website on the classroom projector.',
      'Screen sharing of a video playing on a video-sharing site via videoconference.',
    ],
    explanations: [
      {
        type: 'plane',
        paragraphs: [
          'Public communication means public communications that work through a receiver (Article 23(2)). Therefore, number 3. is the correct answer.',
          'Number 1. relates to reproduction and on-screen presentations.',
          'Number 2. relates to reproduction and public transmissions.',
          'Number 4. relates to a public transmission.',
        ],
      },
    ],
    correctAnswerNumber: 3,
  },
  {
    questionId: 19,
    question: 'Which of the following is an incorrect description of public transmission?',
    choices: [
      'A transmission that can be received only by a specific and small number of persons is not a public transmission.',
      'For works other than program works, transmission, and reception within the same premises only (so-called LAN within the same premises) is not a public transmission.',
      'Automatic public transmission is mainly transmission via the Internet. Even if a work is made available for automatic public transmission, if there is no actual access to the work, the public transmission right is infringed.',
      'Making a work available for automatic public transmission does not constitute an infringement of the right of public transmission without actual access.',
    ],
    explanations: [
      {
        type: 'plane',
        paragraphs: [
          'Regarding number 1., "the public" is defined to include not only unspecified persons but also "exclusive groups made up of many persons" (Article 2(5)). It is interpreted that a specific person and few persons do not constitute "the public".',
          'As for number 2., public transmission within the same premises is excluded (Article 2(1)(vii-2) brackets). In addition, program works are considered public transmissions even within the same premises (Article 2(1)(vii-2) brackets, internal brackets).',
          'As for number 3., an "automatic public transmission" is defined as an "automatic transmission in response to a request from the public" (Article 2(1)(ix-4)), and mainly includes transmissions that are uploaded to the Internet and viewed by a viewer at any point in time. Other examples include, for example, transmission to a karaoke box by a telecommunications karaoke operator.',
          'As for number 4., "making transmittable" is defined as making a work available for automatic public transmission (Article 2(1)(ix-5)), and making a work available for transmission is also included in the public transmission right (Article 23(1)).',
        ],
      },
    ],
    correctAnswerNumber: 4,
  },
  {
    questionId: 20,
    question:
      'Which of the following falls under "unreasonably prejudice the interests of the copyright owner" under the proviso of Article 35(1) of the Copyright Act?',
    choices: [
      'Reproducing an entire photographic work without cropping.',
      'Reproducing slides to illustrate a portion of the textbook the student is purchasing.',
      'Reproducing papers that are not marketable and hard to obtain.',
      'Making practice printouts by duplicating most of the questions from the test sets sold to students.',
    ],
    explanations: [
      {
        type: 'plane',
        paragraphs: [
          'Making practice printouts by copying from a book that is supposed to be purchased for use, such as a test book, would unreasonably prejudice the interests of the copyright owner, as the student does not have to purchase the book to use the practice printouts.',
        ],
      },
    ],
    correctAnswerNumber: 4,
  },
];

export default questions;
