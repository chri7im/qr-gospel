import { Language } from './translations';
import { transporter } from './email';
import { db } from './firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

interface VisitorCount {
  count: number;
}

interface LanguageSelection {
  language: string;
  count: number;
}

interface ConcernSelection {
  concern: string;
  count: number;
}

interface OtherConcern {
  description: string;
}

interface ContactSubmission {
  email: string;
  message: string;
  language: string;
  concern: string;
  phone: string | null;
  visitor_id: string;
}

const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

const generateVisitorId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const trackVisitor = async (visitorId: string) => {
  const date = getCurrentDate();
  try {
    await addDoc(collection(db, 'visitors'), { date, visitorId });
  } catch (error) {
    console.error('Error tracking visitor:', error);
    throw error;
  }
};

export const trackLanguageSelection = async (visitorId: string, language: Language) => {
  const date = getCurrentDate();
  try {
    await addDoc(collection(db, 'language_selections'), { date, language, visitorId });
  } catch (error) {
    console.error('Error tracking language selection:', error);
    throw error;
  }
};

export const trackConcern = async (visitorId: string, concern: string) => {
  const date = getCurrentDate();
  try {
    await addDoc(collection(db, 'concerns'), { date, concern, visitorId });
  } catch (error) {
    console.error('Error tracking concern:', error);
    throw error;
  }
};

export const trackOtherConcern = async (visitorId: string, description: string) => {
  const date = getCurrentDate();
  try {
    await addDoc(collection(db, 'other_concerns'), { date, description, visitorId });
  } catch (error) {
    console.error('Error tracking other concern:', error);
    throw error;
  }
};

const sendContactNotification = async (
  email: string,
  message: string,
  language: Language,
  concern: string,
  phone: string | null,
  visitorId: string
) => {
  try {
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: 'your-email@gmail.com',
      subject: `New Contact Submission - ${email}`,
      text: `A new contact submission has been received:\n\n` +
            `Email: ${email}\n` +
            `Message: ${message}\n` +
            `Language: ${language}\n` +
            `Concern: ${concern}\n` +
            (phone ? `Phone: ${phone}\n` : '') +
            `Visitor ID: ${visitorId}\n` +
            `Date: ${getCurrentDate()}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Contact submission email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending contact submission email:', error);
    throw error;
  }
};

export const trackContactSubmission = async (
  visitorId: string,
  email: string,
  message: string,
  language: Language,
  concern: string,
  phone: string | null
) => {
  const date = getCurrentDate();
  try {
    await addDoc(collection(db, 'contact_submissions'), {
      date,
      email,
      message,
      language,
      concern,
      phone,
      visitor_id: visitorId,
    });
    console.log('Contact submission saved to Firestore:', { visitorId, email });

    await sendContactNotification(email, message, language, concern, phone, visitorId);
  } catch (error: any) {
    console.error('Error tracking contact submission:', error);
    throw new Error(error.message || 'Failed to track contact submission in Firestore or send email');
  }
};

export const generateDailyReport = async (date: string) => {
  try {
    // Total visitors per day
    const visitorsQuery = query(collection(db, 'visitors'), where('date', '==', date));
    const visitorsSnapshot = await getDocs(visitorsQuery);
    const totalVisitors = visitorsSnapshot.size;

    // Language selections per day
    const languageQuery = query(collection(db, 'language_selections'), where('date', '==', date));
    const languageSnapshot = await getDocs(languageQuery);
    const languageSelectionsMap: { [key: string]: number } = {};
    languageSnapshot.forEach(doc => {
      const data = doc.data();
      const language = data.language as string;
      languageSelectionsMap[language] = (languageSelectionsMap[language] || 0) + 1;
    });
    const languageSelections = Object.entries(languageSelectionsMap).map(([language, count]) => ({
      language,
      count,
    }));

    // Concerns chosen per day
    const concernsQuery = query(collection(db, 'concerns'), where('date', '==', date));
    const concernsSnapshot = await getDocs(concernsQuery);
    const concernsMap: { [key: string]: number } = {};
    concernsSnapshot.forEach(doc => {
      const data = doc.data();
      const concern = data.concern as string;
      concernsMap[concern] = (concernsMap[concern] || 0) + 1;
    });
    const concerns = Object.entries(concernsMap).map(([concern, count]) => ({
      concern,
      count,
    }));

    // Other concerns entered per day
    const otherConcernsQuery = query(collection(db, 'other_concerns'), where('date', '==', date));
    const otherConcernsSnapshot = await getDocs(otherConcernsQuery);
    const otherConcerns = otherConcernsSnapshot.docs.map(doc => ({
      description: doc.data().description as string,
    }));
    const otherConcernsDescriptions = otherConcerns.map(row => row.description);

    // Contact submissions per day
    const contactSubmissionsQuery = query(collection(db, 'contact_submissions'), where('date', '==', date));
    const contactSubmissionsSnapshot = await getDocs(contactSubmissionsQuery);
    const contactSubmissions = contactSubmissionsSnapshot.docs.map(doc => doc.data() as ContactSubmission);

    return {
      date,
      totalVisitors,
      languageSelections,
      concerns,
      otherConcerns: otherConcernsDescriptions,
      contactSubmissions,
    };
  } catch (error) {
    console.error('Error generating daily report:', error);
    throw error;
  }
};