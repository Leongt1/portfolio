export type Education = {
  id: string;
  degree: string;
  school: string;
  period: string;
  detail: string;
};

export const education: Education[] = [
  {
    id: "be-ise",
    degree: "B.E. Information Science & Engineering",
    school: "The Oxford College of Engineering, Bengaluru",
    period: "AUG 2019 - MAY 2023",
    detail: "CGPA 8.7 / 10",
  },
  {
    id: "cbse",
    degree: "CBSE (10th-12th)",
    school: "Kendriya Vidyalaya A.S.C Centre, Bengaluru",
    period: "2016 - 2019",
    detail: "8.4 CGPA (10th) · 65% (12th)",
  },
];
