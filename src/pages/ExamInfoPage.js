import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaArrowLeft, FaCheckCircle, FaYoutube, FaBook, FaLaptop, FaClock, FaCalendarAlt, FaGlobe } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem 4rem;
  min-height: calc(100vh - 200px);
`;

const HeaderControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const BackButton = styled.button`
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s;
  &:hover { background: #3182ce; }
`;

const LangToggle = styled.button`
  background: white;
  color: #2d3748;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  
  &:hover {
    background: #f7fafc;
    border-color: #cbd5e0;
  }
`;

const Title = styled.h1`
  color: #2d3748;
  font-size: 2.5rem;
  margin: 0 0 2rem;
  text-align: center;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid #e2e8f0;
`;

const SectionTitle = styled.h2`
  color: #2c5282;
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 2px solid #ebf8ff;
  padding-bottom: 0.5rem;
`;

const SubSectionTitle = styled.h3`
  color: #2d3748;
  font-size: 1.2rem;
  margin: 1.5rem 0 0.75rem;
  font-weight: 600;
`;

const P = styled.p`
  color: #4a5568;
  line-height: 1.7;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  margin: 0 0 1rem 1.5rem;
  color: #4a5568;
  line-height: 1.6;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

const Note = styled.div`
  background: #ebf8ff;
  border-left: 4px solid #4299e1;
  color: #2c5282;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 0 6px 6px 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const ResourceItem = styled.div`
  background: #f7fafc;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #edf2f7;
  
  h4 {
    color: #2d3748;
    margin: 0 0 0.5rem;
  }
  
  p {
    font-size: 0.9rem;
    margin: 0;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  
  th, td {
    border: 1px solid #e2e8f0;
    padding: 0.75rem;
    text-align: left;
  }
  
  th {
    background: #f7fafc;
    color: #4a5568;
    font-weight: 600;
  }
`;

const content = {
  en: {
    back: "Back",
    title: "Everything You Need to Know About the SAT",
    whatIsSat: "What is the SAT?",
    whatIsSatDesc: "The SAT (Scholastic Assessment Test) is a standardized test widely used for college admissions in the United States. It's designed to measure a high school student’s readiness for college and provide colleges with a common data point for comparing applicants.",
    sections: "Sections",
    readingWriting: "Reading & Writing: Comprehension, grammar, and style.",
    math: "Math: Algebra, problem-solving, advanced math.",
    keyFacts: "Key Facts",
    scoring: "Scoring: 400–1600 (200-800 per section)",
    duration: "Duration: ~2 hours 14 minutes",
    format: "Format: Digital (adaptive)",
    satSuite: "The SAT Suite of Assessments",
    satSuiteDesc: "A breakdown of the tests leading up to the SAT, helping students prepare at every stage.",
    psat89: "1. PSAT 8/9",
    psat89Who: "Who takes it: 8th or 9th graders.",
    psat89Purpose: "Purpose: Early introduction to the SAT suite; baseline for readiness.",
    psat89Measures: "Measures: Reading, Writing, Math.",
    psat89Benefits: "Benefits: Builds confidence, connects to career exploration.",
    psat10: "2. PSAT 10",
    psat10Who: "Who takes it: 10th graders (spring).",
    psat10Purpose: "Purpose: Gauge readiness for SAT; plan junior/senior coursework.",
    psat10Measures: "Measures: Same content as SAT, slightly shorter.",
    psat10Benefits: "Benefits: Detailed score reports; identifies AP potential.",
    psatNmsqt: "3. PSAT/NMSQT",
    psatNmsqtWho: "Who takes it: 11th graders (some 10th).",
    psatNmsqtPurpose: "Purpose: Scholarship qualification (National Merit); college readiness.",
    psatNmsqtMeasures: "Measures: Evidence-Based Reading & Writing, Math.",
    psatNmsqtBenefits: "Benefits: Official practice; scholarship eligibility.",
    sat: "4. SAT",
    satWho: "Who takes it: 11th and 12th graders.",
    satPurpose: "Purpose: College entrance exam; assesses college readiness.",
    satMeasures: "Measures: Reading & Writing (logic, vocab), Math (algebra, data analysis).",
    satBenefits: "Benefits: Strengthens applications; course placement; scholarships.",
    tips: "10 Preparation Tips",
    tip1: "Understand the Format: Know the sections and question types.",
    tip2: "Make a Schedule: Start 3-6 months early. Study consistently.",
    tip3: "Use Quality Resources: Khan Academy, Bluebook, Official Guides.",
    tip4: "Focus on Weak Areas: Analyze mistakes and target them.",
    tip5: "Master Math Skills: Review algebra, geometry, and formulas.",
    tip6: "Improve Reading: Read diverse articles (NYT, Scientific American).",
    tip7: "Practice Timed: Simulate real conditions to manage pacing.",
    tip8: "Track Progress: Keep a journal of scores and mistakes.",
    tip9: "Self Care: Sleep well and eat balanced meals.",
    tip10: "Set Goals: Research target colleges and set score goals.",
    studyPlan: "4-Week Study Plan",
    studyPlanGoal: "Goal: Balanced improvement across all sections + full test readiness.",
    week1: "Week 1: Diagnose & Build Foundations",
    week1Tasks: [
      "Mon: Full-length diagnostic test.",
      "Tue-Thu: Review weak areas (Reading, Grammar, Math basics).",
      "Fri-Sun: Practice sets and review mistakes."
    ],
    week2: "Week 2: Deep Practice by Section",
    week2Tasks: [
      "Focus: Strengthen core concepts and time management.",
      "Daily: Rotate between Reading, Grammar, and Math topics.",
      "Sat: Timed Mini Test."
    ],
    week3: "Week 3: Master Strategies + Full Practice",
    week3Tasks: [
      "Focus: Apply strategies and build endurance.",
      "Thu: Timed Math section.",
      "Sat: Full-length practice test."
    ],
    week4: "Week 4: Final Push + Confidence",
    week4Tasks: [
      "Mon-Wed: Review frequent mistakes and mixed practice.",
      "Thu: Light review + test checklist.",
      "Fri: Relax.",
      "Sat: TEST DAY!"
    ],
    resources: "Top Resources",
    officialRes: "Official Resources",
    ytChannels: "YouTube Channels",
    videos: "Top 15 Must-Watch Videos",
    videosDesc: "Search these titles on YouTube for high-yield prep:",
    videoList: [
      "How to Get a PERFECT SCORE on the SAT (SuperTutorTV)",
      "6 Tips for SAT Reading (SuperTutorTV)",
      "SAT Math: Solving Linear Equations (Khan Academy)",
      "The SAT Test Format Explained (PrepScholar)",
      "Solving SAT Math Problems Live (Scalar Learning)",
      "The 9 Essential Grammar Rules for the SAT (Reason Prep)",
      "SAT Writing Crash Course (Magoosh)",
      "Digital SAT Math Practice Test Walkthroughs (Scalar Learning)",
      "How to Improve SAT Reading Score by 100+ Points (PrepScholar)",
      "Cross-Text Connections (Khan Academy)"
    ],
    videoNote: "Weekly Plan: Watch foundational videos in Weeks 1-2, strategy videos in Week 3, and practice walkthroughs in Week 4.",
    bluebook: "Bluebook Guide",
    bluebookDesc: "Bluebook™ is the official app for taking the Digital SAT. It allows you to take full-length practice tests and simulate the real testing environment.",
    install: "How to Install",
    installSteps: [
      "Windows/Mac: Download from bluebook.collegeboard.org.",
      "iPad: Download \"Bluebook College Board\" from App Store.",
      "Chromebook: Ask school administrator (usually pre-installed)."
    ],
    bluebookTip: "Tip: Pair Bluebook with Khan Academy. Use Bluebook for full tests and Khan Academy for targeted skill practice.",
    timing: "Digital SAT Timing",
    timingBreak: "There is a 10-minute break between the Reading & Writing and Math sections.",
    mathPlan: "1-Week Math-Only Plan",
    mathPlanDesc: "Using SuperTutorTV videos (approx. 60-75 mins/day):",
    mathDays: [
      "Day 1: Intro + Mental Strategy + No Calc Walkthrough",
      "Day 2: Algebra + Word Problems (Systems, Ratios, Percents)",
      "Day 3: Functions & Quadratics Masterclass",
      "Day 4: Calculator Section Full Walkthrough",
      "Day 5: Geometry + Graphs",
      "Day 6: Practice Test 10 Math Walkthrough",
      "Day 7: Mixed Practice + \"15 Problems Students Get Wrong\""
    ]
  },
  am: {
    back: "ተመለስ",
    title: "ስለ SAT ፈተና ማወቅ ያለብዎ ነገሮች ሁሉ",
    whatIsSat: "SAT ምንድን ነው?",
    whatIsSatDesc: "SAT (Scholastic Assessment Test) በአሜሪካ ለኮሌጅ መግቢያ በስፋት የሚያገለግል ፈተና ነው። የሁለተኛ ደረጃ ተማሪዎችን ለኮሌጅ ያላቸውን ዝግጁነት ለመለካት እና ለኮሌጆች አመልካቾችን ለማወዳደር ያገለግላል።",
    sections: "ክፍሎች",
    readingWriting: "ንባብ እና ጽሑፍ፡ ግንዛቤ፣ ሰዋሰው እና አጻጻፍ።",
    math: "ሂሳብ፡ አልጀብራ፣ ችግር መፍታት፣ የላቀ ሂሳብ።",
    keyFacts: "ቁልፍ እውነታዎች",
    scoring: "ውጤት፡ 400–1600 (ለእያንዳንዱ ክፍል 200-800)",
    duration: "የፈተና ጊዜ፡ ~2 ሰዓት ከ14 ደቂቃ",
    format: "ቅርጸት፡ ዲጂታል (አዳፕቲቭ)",
    satSuite: "የSAT ምዘናዎች ስብስብ",
    satSuiteDesc: "ተማሪዎች በእያንዳንዱ ደረጃ እንዲዘጋጁ የሚያግዙ ወደ SAT የሚመሩ ፈተናዎች ዝርዝር።",
    psat89: "1. PSAT 8/9",
    psat89Who: "ማን ይፈተናል፡ 8ኛ ወይም 9ኛ ክፍል ተማሪዎች።",
    psat89Purpose: "ዓላማ፡ ለSAT ስብስብ የመጀመሪያ መግቢያ፤ የዝግጁነት መለኪያ።",
    psat89Measures: "የሚለካው፡ ንባብ፣ ጽሑፍ፣ ሂሳብ።",
    psat89Benefits: "ጥቅሞች፡ በራስ መተማመንን ይገነባል፣ ከሙያ ፍለጋ ጋር ያገናኛል።",
    psat10: "2. PSAT 10",
    psat10Who: "ማን ይፈተናል፡ 10ኛ ክፍል ተማሪዎች (በፀደይ)።",
    psat10Purpose: "ዓላማ፡ ለSAT ዝግጁነትን መለካት፤ የ11ኛ/12ኛ ክፍል ትምህርትን ማቀድ።",
    psat10Measures: "የሚለካው፡ ከSAT ጋር ተመሳሳይ ይዘት፣ ትንሽ አጠር ያለ።",
    psat10Benefits: "ጥቅሞች፡ ዝርዝር የውጤት ሪፖርት፤ የAP አቅምን ይለያል።",
    psatNmsqt: "3. PSAT/NMSQT",
    psatNmsqtWho: "ማን ይፈተናል፡ 11ኛ ክፍል (አንዳንድ 10ኛ)።",
    psatNmsqtPurpose: "ዓላማ፡ ለስኮላርሺፕ ብቁነት (National Merit)፤ የኮሌጅ ዝግጁነት።",
    psatNmsqtMeasures: "የሚለካው፡ በማስረጃ የተደገፈ ንባብ እና ጽሑፍ፣ ሂሳብ።",
    psatNmsqtBenefits: "ጥቅሞች፡ ኦፊሴላዊ ልምምድ፤ የስኮላርሺፕ ዕድል።",
    sat: "4. SAT",
    satWho: "ማን ይፈተናል፡ 11ኛ እና 12ኛ ክፍል ተማሪዎች።",
    satPurpose: "ዓላማ፡ የኮሌጅ መግቢያ ፈተና፤ የኮሌጅ ዝግጁነትን ይገመግማል።",
    satMeasures: "የሚለካው፡ ንባብ እና ጽሑፍ (ሎጂክ፣ ቃላት)፣ ሂሳብ (አልጀብራ፣ ዳታ ትንተና)።",
    satBenefits: "ጥቅሞች፡ የመግቢያ ዕድልን ያጠናክራል፤ ለትምህርት ምደባ፤ ስኮላርሺፕ።",
    tips: "10 የዝግጅት ምክሮች",
    tip1: "ቅርጸቱን ይረዱ፡ ክፍሎቹን እና የጥያቄ አይነቶችን ይወቁ።",
    tip2: "ፕሮግራም ያውጡ፡ ከ3-6 ወራት ቀድመው ይጀምሩ። በቋሚነት ያጥኑ።",
    tip3: "ጥራት ያላቸውን ምንጮች ይጠቀሙ፡ Khan Academy, Bluebook, Official Guides.",
    tip4: "ደካማ ጎኖች ላይ ያተኩሩ፡ ስህተቶችን ይተንትኑ እና ያሻሽሉ።",
    tip5: "የሂሳብ ክህሎቶችን ያዳብሩ፡ አልጀብራ፣ ጂኦሜትሪ እና ቀመሮችን ይከልሱ።",
    tip6: "ንባብን ያሻሽሉ፡ የተለያዩ ጽሑፎችን ያንብቡ (NYT, Scientific American).",
    tip7: "በሰዓት ይለማመዱ፡ ትክክለኛውን የፈተና ሁኔታ ይፍጠሩ።",
    tip8: "ሂደትዎን ይከታተሉ፡ ውጤቶችን እና ስህተቶችን ይመዝግቡ።",
    tip9: "ራስን መንከባከብ፡ በቂ እንቅልፍ እና የተመጣጠነ ምግብ።",
    tip10: "ግቦችን ያውጡ፡ የሚፈልጉትን ኮሌጅ ውጤት ይወቁ።",
    studyPlan: "የ4-ሳምንት የጥናት ዕቅድ",
    studyPlanGoal: "ግብ፡ በሁሉም ክፍሎች ላይ ሚዛናዊ መሻሻል + ሙሉ የፈተና ዝግጁነት።",
    week1: "ሳምንት 1፡ መመርመር እና መሰረት መጣል",
    week1Tasks: [
      "ሰኞ፡ ሙሉ የልምምድ ፈተና መውሰድ።",
      "ማክሰኞ-ሐሙስ፡ ደካማ ጎኖችን መከለስ (ንባብ፣ ሰዋሰው፣ ሂሳብ)።",
      "አርብ-እሁድ፡ የልምምድ ጥያቄዎችን መስራት እና ስህተቶችን ማየት።"
    ],
    week2: "ሳምንት 2፡ ጥልቅ ልምምድ በክፍል",
    week2Tasks: [
      "ትኩረት፡ ዋና ፅንሰ-ሀሳቦችን እና የሰዓት አጠቃቀምን ማጠናከር።",
      "በየቀኑ፡ በንባብ፣ ሰዋሰው እና ሂሳብ መካከል ማፈራረቅ።",
      "ቅዳሜ፡ አጭር የጊዜ ገደብ ያለው ፈተና።"
    ],
    week3: "ሳምንት 3፡ ስልቶችን መቆጣጠር + ሙሉ ልምምድ",
    week3Tasks: [
      "ትኩረት፡ ስልቶችን መተግበር እና ጽናትን መገንባት።",
      "ሐሙስ፡ የሂሳብ ፈተና በሰዓት።",
      "ቅዳሜ፡ ሙሉ የልምምድ ፈተና።"
    ],
    week4: "ሳምንት 4፡ የመጨረሻ ዝግጅት + በራስ መተማመን",
    week4Tasks: [
      "ሰኞ-ረቡዕ፡ ተደጋጋሚ ስህተቶችን መከለስ።",
      "ሐሙስ፡ ቀላል ክለሳ + የፈተና ዝርዝር።",
      "አርብ፡ ዘና ማለት።",
      "ቅዳሜ፡ የፈተና ቀን!"
    ],
    resources: "ምርጥ የመማሪያ ምንጮች",
    officialRes: "ኦፊሴላዊ ምንጮች",
    ytChannels: "የYouTube ቻናሎች",
    videos: "ምርጥ 15 የግድ መታየት ያለባቸው ቪዲዮዎች",
    videosDesc: "ለከፍተኛ ውጤት እነዚህን ርዕሶች YouTube ላይ ይፈልጉ፡",
    videoList: [
      "How to Get a PERFECT SCORE on the SAT (SuperTutorTV)",
      "6 Tips for SAT Reading (SuperTutorTV)",
      "SAT Math: Solving Linear Equations (Khan Academy)",
      "The SAT Test Format Explained (PrepScholar)",
      "Solving SAT Math Problems Live (Scalar Learning)",
      "The 9 Essential Grammar Rules for the SAT (Reason Prep)",
      "SAT Writing Crash Course (Magoosh)",
      "Digital SAT Math Practice Test Walkthroughs (Scalar Learning)",
      "How to Improve SAT Reading Score by 100+ Points (PrepScholar)",
      "Cross-Text Connections (Khan Academy)"
    ],
    videoNote: "ሳምንታዊ ዕቅድ፡ በሳምንት 1-2 መሰረታዊ ቪዲዮዎችን፣ በሳምንት 3 ስልቶችን፣ በሳምንት 4 የልምምድ ማብራሪያዎችን ይመልከቱ።",
    bluebook: "የBluebook መመሪያ",
    bluebookDesc: "Bluebook™ ዲጂታል SAT ለመውሰድ የሚያገለግል ኦፊሴላዊ መተግበሪያ ነው። ሙሉ የልምምድ ፈተናዎችን ለመውሰድ እና ትክክለኛውን የፈተና ሁኔታ ለመለማመድ ያስችላል።",
    install: "እንዴት እንደሚጫን",
    installSteps: [
      "Windows/Mac: ከ bluebook.collegeboard.org ያውርዱ።",
      "iPad: ከ App Store \"Bluebook College Board\" ብለው ያውርዱ።",
      "Chromebook: የትምህርት ቤት አስተዳዳሪን ይጠይቁ።"
    ],
    bluebookTip: "ምክር፡ Bluebookን ከ Khan Academy ጋር ያጣምሩ። Bluebookን ለሙሉ ፈተና፣ Khan Academyን ለክህሎት ልምምድ ይጠቀሙ።",
    timing: "የዲጂታል SAT ጊዜ አሰጣጥ",
    timingBreak: "በንባብ እና ጽሑፍ እና በሂሳብ ክፍሎች መካከል የ10 ደቂቃ እረፍት አለ።",
    mathPlan: "የ1-ሳምንት የሂሳብ ብቻ ዕቅድ",
    mathPlanDesc: "SuperTutorTV ቪዲዮዎችን በመጠቀም (በቀን ~60-75 ደቂቃ):",
    mathDays: [
      "ቀን 1: መግቢያ + የአእምሮ ስልት + No Calc Walkthrough",
      "ቀን 2: አልጀብራ + የቃላት ጥያቄዎች (Systems, Ratios, Percents)",
      "ቀን 3: Functions & Quadratics Masterclass",
      "ቀን 4: Calculator Section Full Walkthrough",
      "ቀን 5: ጂኦሜትሪ + ግራፎች",
      "ቀን 6: Practice Test 10 Math Walkthrough",
      "ቀን 7: ቅልቅል ልምምድ + \"ተማሪዎች የሚሳሳቷቸው 15 ጥያቄዎች\""
    ]
  }
};

const ExamInfoPage = () => {
  const navigate = useNavigate();
  const { examId } = useParams();
  const [lang, setLang] = useState('en');

  const t = content[lang];

  const goBack = () => {
    navigate(-1);
  };

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'am' : 'en');
  };

  const id = (examId || '').toLowerCase();
  const isSAT = id === 'sat';
  const isGRE = id === 'gre';

  return (
    <Container>
      <HeaderControls>
        <BackButton onClick={goBack}><FaArrowLeft /> {t.back}</BackButton>
        <LangToggle onClick={toggleLang}>
          <FaGlobe /> {lang === 'en' ? 'አማርኛ' : 'English'}
        </LangToggle>
      </HeaderControls>

      <Title>
        {isSAT ? t.title : isGRE ? 'About the GRE' : 'About Exam'}
      </Title>

      {isSAT ? (
        <>
          <Card>
            <SectionTitle><FaBook /> {t.whatIsSat}</SectionTitle>
            <P>{t.whatIsSatDesc}</P>
            <Grid>
              <ResourceItem>
                <h4>{t.sections}</h4>
                <List>
                  <ListItem>{t.readingWriting}</ListItem>
                  <ListItem>{t.math}</ListItem>
                </List>
              </ResourceItem>
              <ResourceItem>
                <h4>{t.keyFacts}</h4>
                <List>
                  <ListItem>{t.scoring}</ListItem>
                  <ListItem>{t.duration}</ListItem>
                  <ListItem>{t.format}</ListItem>
                </List>
              </ResourceItem>
            </Grid>
          </Card>

          <Card>
            <SectionTitle><FaBook /> {t.satSuite}</SectionTitle>
            <P>{t.satSuiteDesc}</P>

            <SubSectionTitle>{t.psat89}</SubSectionTitle>
            <List>
              <ListItem>{t.psat89Who}</ListItem>
              <ListItem>{t.psat89Purpose}</ListItem>
              <ListItem>{t.psat89Measures}</ListItem>
              <ListItem>{t.psat89Benefits}</ListItem>
            </List>

            <SubSectionTitle>{t.psat10}</SubSectionTitle>
            <List>
              <ListItem>{t.psat10Who}</ListItem>
              <ListItem>{t.psat10Purpose}</ListItem>
              <ListItem>{t.psat10Measures}</ListItem>
              <ListItem>{t.psat10Benefits}</ListItem>
            </List>

            <SubSectionTitle>{t.psatNmsqt}</SubSectionTitle>
            <List>
              <ListItem>{t.psatNmsqtWho}</ListItem>
              <ListItem>{t.psatNmsqtPurpose}</ListItem>
              <ListItem>{t.psatNmsqtMeasures}</ListItem>
              <ListItem>{t.psatNmsqtBenefits}</ListItem>
            </List>

            <SubSectionTitle>{t.sat}</SubSectionTitle>
            <List>
              <ListItem>{t.satWho}</ListItem>
              <ListItem>{t.satPurpose}</ListItem>
              <ListItem>{t.satMeasures}</ListItem>
              <ListItem>{t.satBenefits}</ListItem>
            </List>
          </Card>

          <Card>
            <SectionTitle><FaCheckCircle /> {t.tips}</SectionTitle>
            <List>
              <ListItem>{t.tip1}</ListItem>
              <ListItem>{t.tip2}</ListItem>
              <ListItem>{t.tip3}</ListItem>
              <ListItem>{t.tip4}</ListItem>
              <ListItem>{t.tip5}</ListItem>
              <ListItem>{t.tip6}</ListItem>
              <ListItem>{t.tip7}</ListItem>
              <ListItem>{t.tip8}</ListItem>
              <ListItem>{t.tip9}</ListItem>
              <ListItem>{t.tip10}</ListItem>
            </List>
          </Card>

          <Card>
            <SectionTitle><FaCalendarAlt /> {t.studyPlan}</SectionTitle>
            <P><strong>{t.studyPlanGoal}</strong></P>

            <SubSectionTitle>{t.week1}</SubSectionTitle>
            <List>
              {t.week1Tasks.map((task, i) => <ListItem key={i}>{task}</ListItem>)}
            </List>

            <SubSectionTitle>{t.week2}</SubSectionTitle>
            <List>
              {t.week2Tasks.map((task, i) => <ListItem key={i}>{task}</ListItem>)}
            </List>

            <SubSectionTitle>{t.week3}</SubSectionTitle>
            <List>
              {t.week3Tasks.map((task, i) => <ListItem key={i}>{task}</ListItem>)}
            </List>

            <SubSectionTitle>{t.week4}</SubSectionTitle>
            <List>
              {t.week4Tasks.map((task, i) => <ListItem key={i}>{task}</ListItem>)}
            </List>
          </Card>

          <Card>
            <SectionTitle><FaLaptop /> {t.resources}</SectionTitle>
            <Grid>
              <ResourceItem>
                <h4>{t.officialRes}</h4>
                <List>
                  <ListItem><strong>Khan Academy:</strong> Free, personalized practice.</ListItem>
                  <ListItem><strong>Bluebook App:</strong> Official digital testing app.</ListItem>
                  <ListItem><strong>College Board:</strong> Official practice tests.</ListItem>
                </List>
              </ResourceItem>
              <ResourceItem>
                <h4>{t.ytChannels}</h4>
                <List>
                  <ListItem><strong>SuperTutorTV:</strong> Deep strategy & hard questions.</ListItem>
                  <ListItem><strong>Khan Academy SAT:</strong> Concept reviews.</ListItem>
                  <ListItem><strong>Scalar Learning:</strong> Math walkthroughs.</ListItem>
                  <ListItem><strong>Reason Prep:</strong> Grammar & writing.</ListItem>
                </List>
              </ResourceItem>
            </Grid>
          </Card>

          <Card>
            <SectionTitle><FaYoutube /> {t.videos}</SectionTitle>
            <P>{t.videosDesc}</P>
            <List>
              {t.videoList.map((vid, i) => <ListItem key={i}>{vid}</ListItem>)}
            </List>
            <Note>
              {t.videoNote}
            </Note>
          </Card>

          <Card>
            <SectionTitle><FaLaptop /> {t.bluebook}</SectionTitle>
            <P>{t.bluebookDesc}</P>
            <SubSectionTitle>{t.install}</SubSectionTitle>
            <List>
              {t.installSteps.map((step, i) => <ListItem key={i}>{step}</ListItem>)}
            </List>
            <Note>
              {t.bluebookTip}
            </Note>
          </Card>

          <Card>
            <SectionTitle><FaClock /> {t.timing}</SectionTitle>
            <Table>
              <thead>
                <tr>
                  <th>Section</th>
                  <th>Modules</th>
                  <th>Time per Module</th>
                  <th>Total Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Reading & Writing</td>
                  <td>2</td>
                  <td>32 minutes</td>
                  <td>64 minutes</td>
                </tr>
                <tr>
                  <td>Math</td>
                  <td>2</td>
                  <td>35 minutes</td>
                  <td>70 minutes</td>
                </tr>
                <tr>
                  <td><strong>Total</strong></td>
                  <td><strong>4</strong></td>
                  <td>-</td>
                  <td><strong>2 hr 14 min</strong></td>
                </tr>
              </tbody>
            </Table>
            <P>{t.timingBreak}</P>
          </Card>

          <Card>
            <SectionTitle>🧮 {t.mathPlan}</SectionTitle>
            <P>{t.mathPlanDesc}</P>
            <List>
              {t.mathDays.map((day, i) => <ListItem key={i}>{day}</ListItem>)}
            </List>
          </Card>
        </>
      ) : isGRE ? (
        <>
          <Card>
            <SectionTitle>Overview</SectionTitle>
            <P>
              The GRE (Graduate Record Examination) is a standardized test used for admissions
              into many graduate programs worldwide. It evaluates verbal reasoning, quantitative
              reasoning, and analytical writing skills.
            </P>
          </Card>

          <Card>
            <SectionTitle>Test Sections</SectionTitle>
            <List>
              <ListItem><strong>Analytical Writing</strong>: 2 tasks (Issue and Argument), 60 minutes</ListItem>
              <ListItem><strong>Verbal Reasoning</strong>: 2 sections, ~20 questions each, ~30 minutes per section</ListItem>
              <ListItem><strong>Quantitative Reasoning</strong>: 2 sections, ~20 questions each, ~35 minutes per section</ListItem>
              <ListItem><strong>Unscored/Research</strong>: May be included and not identified</ListItem>
            </List>
          </Card>

          <Card>
            <SectionTitle>Scoring</SectionTitle>
            <P>
              Verbal and Quantitative sections are scored on a 130–170 scale (1-point increments),
              while Analytical Writing is scored on a 0–6 scale (half-point increments).
            </P>
            <Note>
              Tip: Build vocabulary for Verbal, master data interpretation for Quant, and practice
              structuring essays for Analytical Writing.
            </Note>
          </Card>

          <Card>
            <SectionTitle>Test Duration</SectionTitle>
            <P>Approximately 3 hours 45 minutes, including a short break.</P>
          </Card>
        </>
      ) : (
        <Card>
          <P>Information for this exam will be added soon.</P>
        </Card>
      )}
    </Container>
  );
};

export default ExamInfoPage;
