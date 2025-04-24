'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { t, Language } from '../lib/translations.ts';
import SuspenseWrapper from '../lib/SuspenseWrapper';

// List of country codes (simplified for demonstration)
const countryCodes = [
  { code: '+93', label: 'Afghanistan (+93)' },
  { code: '+355', label: 'Albania (+355)' },
  { code: '+213', label: 'Algeria (+213)' },
  { code: '+1-684', label: 'American Samoa (+1-684)' },
  { code: '+376', label: 'Andorra (+376)' },
  { code: '+244', label: 'Angola (+244)' },
  { code: '+1-264', label: 'Anguilla (+1-264)' },
  { code: '+672', label: 'Antarctica (+672)' },
  { code: '+1-268', label: 'Antigua and Barbuda (+1-268)' },
  { code: '+54', label: 'Argentina (+54)' },
  { code: '+374', label: 'Armenia (+374)' },
  { code: '+297', label: 'Aruba (+297)' },
  { code: '+61', label: 'Australia (+61)' },
  { code: '+43', label: 'Austria (+43)' },
  { code: '+994', label: 'Azerbaijan (+994)' },
  { code: '+1-242', label: 'Bahamas (+1-242)' },
  { code: '+973', label: 'Bahrain (+973)' },
  { code: '+880', label: 'Bangladesh (+880)' },
  { code: '+1-246', label: 'Barbados (+1-246)' },
  { code: '+375', label: 'Belarus (+375)' },
  { code: '+32', label: 'Belgium (+32)' },
  { code: '+501', label: 'Belize (+501)' },
  { code: '+229', label: 'Benin (+229)' },
  { code: '+1-441', label: 'Bermuda (+1-441)' },
  { code: '+975', label: 'Bhutan (+975)' },
  { code: '+591', label: 'Bolivia (+591)' },
  { code: '+599', label: 'Bonaire or Curacao (+599)' },
  { code: '+387', label: 'Bosnia and Herzegovina (+387)' },
  { code: '+267', label: 'Botswana (+267)' },
  { code: '+55', label: 'Brazil (+55)' },
  { code: '+246', label: 'British Indian Ocean Territory (+246)' },
  { code: '+673', label: 'Brunei Darussalam (+673)' },
  { code: '+359', label: 'Bulgaria (+359)' },
  { code: '+226', label: 'Burkina Faso (+226)' },
  { code: '+257', label: 'Burundi (+257)' },
  { code: '+855', label: 'Cambodia (+855)' },
  { code: '+237', label: 'Cameroon (+237)' },
  { code: '+238', label: 'Cape Verde (+238)' },
  { code: '+1-345', label: 'Cayman Islands (+1-345)' },
  { code: '+236', label: 'Central African Republic (+236)' },
  { code: '+235', label: 'Chad (+235)' },
  { code: '+56', label: 'Chile (+56)' },
  { code: '+86', label: 'China (+86)' },
  { code: '+57', label: 'Colombia (+57)' },
  { code: '+269', label: 'Comoros (+269)' },
  { code: '+242', label: 'Congo (+242)' },
  { code: '+243', label: 'Democratic Republic of the Congo (+243)' },
  { code: '+682', label: 'Cook Islands (+682)' },
  { code: '+506', label: 'Costa Rica (+506)' },
  { code: '+385', label: 'Croatia (+385)' },
  { code: '+53', label: 'Cuba (+53)' },
  { code: '+357', label: 'Cyprus (+357)' },
  { code: '+420', label: 'Czech Republic (+420)' },
  { code: '+225', label: 'Cote d\'Ivoire (+225)' },
  { code: '+45', label: 'Denmark (+45)' },
  { code: '+253', label: 'Djibouti (+253)' },
  { code: '+1-767', label: 'Dominica (+1-767)' },
  { code: '+1-809,1-829,1-849', label: 'Dominican Republic (+1-809,1-829,1-849)' },
  { code: '+593', label: 'Ecuador (+593)' },
  { code: '+20', label: 'Egypt (+20)' },
  { code: '+503', label: 'El Salvador (+503)' },
  { code: '+240', label: 'Equatorial Guinea (+240)' },
  { code: '+291', label: 'Eritrea (+291)' },
  { code: '+372', label: 'Estonia (+372)' },
  { code: '+251', label: 'Ethiopia (+251)' },
  { code: '+500', label: 'Falkland Islands (Malvinas) (+500)' },
  { code: '+298', label: 'Faroe Islands (+298)' },
  { code: '+679', label: 'Fiji (+679)' },
  { code: '+358', label: 'Finland (+358)' },
  { code: '+33', label: 'France (+33)' },
  { code: '+594', label: 'French Guiana (+594)' },
  { code: '+689', label: 'French Polynesia (+689)' },
  { code: '+262', label: 'French Southern Territories (+262)' },
  { code: '+241', label: 'Gabon (+241)' },
  { code: '+220', label: 'Gambia (+220)' },
  { code: '+995', label: 'Georgia (+995)' },
  { code: '+49', label: 'Germany (+49)' },
  { code: '+233', label: 'Ghana (+233)' },
  { code: '+350', label: 'Gibraltar (+350)' },
  { code: '+30', label: 'Greece (+30)' },
  { code: '+299', label: 'Greenland (+299)' },
  { code: '+1-473', label: 'Grenada (+1-473)' },
  { code: '+590', label: 'Guadeloupe (+590)' },
  { code: '+1-671', label: 'Guam (+1-671)' },
  { code: '+502', label: 'Guatemala (+502)' },
  { code: '+224', label: 'Guinea (+224)' },
  { code: '+245', label: 'Guinea-Bissau (+245)' },
  { code: '+592', label: 'Guyana (+592)' },
  { code: '+509', label: 'Haiti (+509)' },
  { code: '+379', label: 'Holy See (Vatican City State) (+379)' },
  { code: '+504', label: 'Honduras (+504)' },
  { code: '+852', label: 'Hong Kong (+852)' },
  { code: '+36', label: 'Hungary (+36)' },
  { code: '+354', label: 'Iceland (+354)' },
  { code: '+91', label: 'India (+91)' },
  { code: '+62', label: 'Indonesia (+62)' },
  { code: '+98', label: 'Iran, Islamic Republic of (+98)' },
  { code: '+964', label: 'Iraq (+964)' },
  { code: '+353', label: 'Ireland (+353)' },
  { code: '+972', label: 'Israel (+972)' },
  { code: '+39', label: 'Italy (+39)' },
  { code: '+1-876', label: 'Jamaica (+1-876)' },
  { code: '+81', label: 'Japan (+81)' },
  { code: '+962', label: 'Jordan (+962)' },
  { code: '+254', label: 'Kenya (+254)' },
  { code: '+686', label: 'Kiribati (+686)' },
  { code: '+850', label: 'Korea, Democratic People\'s Republic of (+850)' },
  { code: '+82', label: 'Korea, Republic of (+82)' },
  { code: '+965', label: 'Kuwait (+965)' },
  { code: '+996', label: 'Kyrgyzstan (+996)' },
  { code: '+856', label: 'Lao People\'s Democratic Republic (+856)' },
  { code: '+371', label: 'Latvia (+371)' },
  { code: '+961', label: 'Lebanon (+961)' },
  { code: '+266', label: 'Lesotho (+266)' },
  { code: '+231', label: 'Liberia (+231)' },
  { code: '+218', label: 'Libya (+218)' },
  { code: '+423', label: 'Liechtenstein (+423)' },
  { code: '+370', label: 'Lithuania (+370)' },
  { code: '+352', label: 'Luxembourg (+352)' },
  { code: '+853', label: 'Macao (+853)' },
  { code: '+389', label: 'Macedonia, the Former Yugoslav Republic of (+389)' },
  { code: '+261', label: 'Madagascar (+261)' },
  { code: '+265', label: 'Malawi (+265)' },
  { code: '+60', label: 'Malaysia (+60)' },
  { code: '+960', label: 'Maldives (+960)' },
  { code: '+223', label: 'Mali (+223)' },
  { code: '+356', label: 'Malta (+356)' },
  { code: '+692', label: 'Marshall Islands (+692)' },
  { code: '+596', label: 'Martinique (+596)' },
  { code: '+222', label: 'Mauritania (+222)' },
  { code: '+230', label: 'Mauritius (+230)' },
  { code: '+52', label: 'Mexico (+52)' },
  { code: '+691', label: 'Micronesia, Federated States of (+691)' },
  { code: '+373', label: 'Moldova, Republic of (+373)' },
  { code: '+377', label: 'Monaco (+377)' },
  { code: '+976', label: 'Mongolia (+976)' },
  { code: '+382', label: 'Montenegro (+382)' },
  { code: '+1-664', label: 'Montserrat (+1-664)' },
  { code: '+212', label: 'Morocco (+212)' },
  { code: '+258', label: 'Mozambique (+258)' },
  { code: '+95', label: 'Myanmar (+95)' },
  { code: '+264', label: 'Namibia (+264)' },
  { code: '+674', label: 'Nauru (+674)' },
  { code: '+977', label: 'Nepal (+977)' },
  { code: '+31', label: 'Netherlands (+31)' },
  { code: '+687', label: 'New Caledonia (+687)' },
  { code: '+64', label: 'New Zealand (+64)' },
  { code: '+505', label: 'Nicaragua (+505)' },
  { code: '+227', label: 'Niger (+227)' },
  { code: '+234', label: 'Nigeria (+234)' },
  { code: '+683', label: 'Niue (+683)' },
  { code: '+1-670', label: 'Northern Mariana Islands (+1-670)' },
  { code: '+47', label: 'Norway (+47)' },
  { code: '+968', label: 'Oman (+968)' },
  { code: '+92', label: 'Pakistan (+92)' },
  { code: '+680', label: 'Palau (+680)' },
  { code: '+970', label: 'Palestine, State of (+970)' },
  { code: '+507', label: 'Panama (+507)' },
  { code: '+675', label: 'Papua New Guinea (+675)' },
  { code: '+595', label: 'Paraguay (+595)' },
  { code: '+51', label: 'Peru (+51)' },
  { code: '+63', label: 'Philippines (+63)' },
  { code: '+870', label: 'Pitcairn (+870)' },
  { code: '+48', label: 'Poland (+48)' },
  { code: '+351', label: 'Portugal (+351)' },
  { code: '+974', label: 'Qatar (+974)' },
  { code: '+40', label: 'Romania (+40)' },
  { code: '+7', label: 'Russian Federation or Kazakhstan (+7)' },
  { code: '+250', label: 'Rwanda (+250)' },
  { code: '+290', label: 'Saint Helena (+290)' },
  { code: '+1-869', label: 'Saint Kitts and Nevis (+1-869)' },
  { code: '+1-758', label: 'Saint Lucia (+1-758)' },
  { code: '+508', label: 'Saint Pierre and Miquelon (+508)' },
  { code: '+1-784', label: 'Saint Vincent and the Grenadines (+1-784)' },
  { code: '+685', label: 'Samoa (+685)' },
  { code: '+378', label: 'San Marino (+378)' },
  { code: '+239', label: 'Sao Tome and Principe (+239)' },
  { code: '+966', label: 'Saudi Arabia (+966)' },
  { code: '+221', label: 'Senegal (+221)' },
  { code: '+381', label: 'Serbia (+381)' },
  { code: '+248', label: 'Seychelles (+248)' },
  { code: '+232', label: 'Sierra Leone (+232)' },
  { code: '+65', label: 'Singapore (+65)' },
  { code: '+1-721', label: 'Sint Maarten (Dutch part) (+1-721)' },
  { code: '+421', label: 'Slovakia (+421)' },
  { code: '+386', label: 'Slovenia (+386)' },
  { code: '+677', label: 'Solomon Islands (+677)' },
  { code: '+252', label: 'Somalia (+252)' },
  { code: '+27', label: 'South Africa (+27)' },
  { code: '+211', label: 'South Sudan (+211)' },
  { code: '+34', label: 'Spain (+34)' },
  { code: '+94', label: 'Sri Lanka (+94)' },
  { code: '+249', label: 'Sudan (+249)' },
  { code: '+597', label: 'Suriname (+597)' },
  { code: '+268', label: 'Swaziland (+268)' },
  { code: '+46', label: 'Sweden (+46)' },
  { code: '+41', label: 'Switzerland (+41)' },
  { code: '+963', label: 'Syrian Arab Republic (+963)' },
  { code: '+886', label: 'Taiwan (+886)' },
  { code: '+992', label: 'Tajikistan (+992)' },
  { code: '+255', label: 'United Republic of Tanzania (+255)' },
  { code: '+66', label: 'Thailand (+66)' },
  { code: '+670', label: 'Timor-Leste (+670)' },
  { code: '+228', label: 'Togo (+228)' },
  { code: '+690', label: 'Tokelau (+690)' },
  { code: '+676', label: 'Tonga (+676)' },
  { code: '+1-868', label: 'Trinidad and Tobago (+1-868)' },
  { code: '+216', label: 'Tunisia (+216)' },
  { code: '+90', label: 'Turkey (+90)' },
  { code: '+993', label: 'Turkmenistan (+993)' },
  { code: '+1-649', label: 'Turks and Caicos Islands (+1-649)' },
  { code: '+688', label: 'Tuvalu (+688)' },
  { code: '+256', label: 'Uganda (+256)' },
  { code: '+380', label: 'Ukraine (+380)' },
  { code: '+971', label: 'United Arab Emirates (+971)' },
  { code: '+44', label: 'United Kingdom (+44)' },
  { code: '+1', label: 'United States or Canada (+1)' },
  { code: '+598', label: 'Uruguay (+598)' },
  { code: '+998', label: 'Uzbekistan (+998)' },
  { code: '+678', label: 'Vanuatu (+678)' },
  { code: '+58', label: 'Venezuela (+58)' },
  { code: '+84', label: 'Viet Nam (+84)' },
  { code: '+1-284', label: 'British Virgin Islands (+1-284)' },
  { code: '+1-340', label: 'US Virgin Islands (+1-340)' },
  { code: '+681', label: 'Wallis and Futuna (+681)' },
  { code: '+967', label: 'Yemen (+967)' },
  { code: '+260', label: 'Zambia (+260)' },
  { code: '+263', label: 'Zimbabwe (+263)' },  
];

export default function Contact() {
  return (
    <SuspenseWrapper>
      <ContactContent />
    </SuspenseWrapper>
  );
}

function ContactContent() {
  const searchParams = useSearchParams();
  const lang = (searchParams.get('lang') || 'English') as Language;
  const visitorId = searchParams.get('visitorId') || '';
  const issue = searchParams.get('issue') || '';
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [useCustomMessage, setUseCustomMessage] = useState(false);
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const finalMessage = useCustomMessage ? message : "I'd like to hear more";
      const fullPhoneNumber = phoneNumber ? `${countryCode}${phoneNumber}` : null;
      const response = await fetch('/api/track-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitorId,
          email,
          message: finalMessage,
          language: lang,
          concern: issue,
          phone: fullPhoneNumber,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to track contact submission');
      }
      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setError('An error occurred while submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className='w-full max-w-md h-screen flex flex-col items-center justify-center p-4'>
        <h1 className='text-xl font-bold mb-4 text-center'>{t('contactUsThankYouTitle', lang)}</h1>
        <p className='text-lg text-center'>{t('contactUsThankYouMessage', lang)}</p>
      </div>
    );
  }

  return (
    <div className='w-full max-w-md h-screen flex flex-col items-center justify-center p-4'>
      <h1 className='text-xl font-bold mb-4 text-center'>{t('contactUsTitle', lang)}</h1>
      <form onSubmit={handleSubmit} className='w-full flex flex-col items-center'>
        <input
          type='email'
          className='w-full p-2 border rounded-lg mb-4'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('contactUsEmailPlaceholder', lang)}
          required
          disabled={isSubmitting}
          onInvalid={(e) => e.currentTarget.setCustomValidity(t('formRequiredError', lang))}
          onInput={(e) => e.currentTarget.setCustomValidity('')} // Reset custom message on input
        />
        <div className='w-full mb-4'>
          <label className='block text-sm mb-1'>{t('contactUsPhoneLabel', lang)}</label>
          <div className='flex gap-2'>
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className='p-2 border rounded-lg'
              disabled={isSubmitting}
            >
              {countryCodes.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.label}
                </option>
              ))}
            </select>
            <input
              type='tel'
              className='flex-1 p-2 border rounded-lg'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder='1234567890'
              disabled={isSubmitting}
            />
          </div>
        </div>
        <div className='mb-4'>
          <label className='flex items-center'>
            <input
              type='checkbox'
              checked={useCustomMessage}
              onChange={(e) => setUseCustomMessage(e.target.checked)}
              className='mr-2'
              disabled={isSubmitting}
            />
            <span>{t('contactUsAddMessageLabel', lang)}</span>
          </label>
        </div>
        {useCustomMessage && (
          <textarea
            className='w-full p-2 border rounded-lg mb-4'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('contactUsMessagePlaceholder', lang)}
            rows={4}
            required
            disabled={isSubmitting}
            onInvalid={(e) => e.currentTarget.setCustomValidity(t('formRequiredError', lang))}
            onInput={(e) => e.currentTarget.setCustomValidity('')} // Reset custom message on input
          />
        )}
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <button
          type='submit'
          className='px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : t('contactUsSubmit', lang)}
        </button>
      </form>
    </div>
  );
}