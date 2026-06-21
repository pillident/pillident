
// --- AI "Brain" and Database ---
// In a real application, this would be a real database 
// and the AI would be a real model.

const MOCK_PILL_DATABASE = [
    {
        id: 'k_000001',
        pillName: '타이레놀정 500밀리그람',
        ingredient: '아세트아미노펜 500mg',
        company: '한국얀센',
        imageSrc: 'https://www.health.kr/images/id_image/k_000001.jpg',
        description: '해열, 감기에 의한 동통(통증), 두통, 치통, 근육통, 생리통 등을 완화하는 데 사용되는 해열진통제입니다.'
    },
    {
        id: 'k_000002',
        pillName: '부루펜정 400밀리그램',
        ingredient: '이부프로펜 400mg',
        company: '삼일제약',
        imageSrc: 'https://www.health.kr/images/id_image/k_000002.jpg',
        description: '류마티스 관절염, 골관절염, 감기로 인한 발열 및 통증 등에 사용되는 비스테로이드성 소염진통제입니다.'
    },
    {
        id: 'k_000003',
        pillName: '아모크라정 625밀리그램',
        ingredient: '아목시실린/클라불란산칼륨',
        company: '한미약품',
        imageSrc: 'https://www.health.kr/images/id_image/k_000003.jpg',
        description: '기관지염, 폐렴, 부비동염, 중이염 등 다양한 부위의 세균 감염을 치료하는 데 사용되는 항생제입니다.'
    },
    {
        id: 'k_000004',
        pillName: '리피토정 10밀리그램',
        ingredient: '아토르바스타틴 칼슘 10mg',
        company: '비아트리스코리아',
        imageSrc: 'https://www.health.kr/images/id_image/k_000004.jpg',
        description: '고지혈증 환자의 혈중 콜레스테롤 수치를 낮추는 데 사용되는 전문의약품입니다.'
    },
    {
        id: 'k_000005',
        pillName: '노바스크정 5밀리그램',
        ingredient: '암로디핀 베실산염 5mg',
        company: '비아트리스코리아',
        imageSrc: 'https://www.health.kr/images/id_image/k_000005.jpg',
        description: '고혈압 및 심근성 허혈증(심장에 혈액 공급이 원활하지 않아 발생하는 질환) 치료에 사용되는 전문의약품입니다.'
    },
    {
        id: 'k_000006',
        pillName: '자누비아정 100밀리그램',
        ingredient: '시타글립틴 100mg',
        company: '한국엠에스디',
        imageSrc: 'https://www.health.kr/images/id_image/k_000006.jpg',
        description: '제2형 당뇨병 환자의 혈당 조절을 돕기 위해 사용되는 전문의약품입니다.'
    },
    {
        id: 'k_000007',
        pillName: '콘서타OROS서방정 18밀리그램',
        ingredient: '메틸페니데이트염산염 18mg',
        company: '한국얀센',
        imageSrc: 'https://www.health.kr/images/id_image/k_000007.jpg',
        description: '주의력결핍 과다행동장애(ADHD) 치료에 사용되는 전문의약품입니다. 중추신경계를 자극하여 집중력을 높여줍니다.'
    }
];


/**
 * Simulates analyzing a pill image with a multimodal AI like Gemini.
 * In a real implementation, this function would make a network request 
 * to a generative AI API.
 * 
 * @param {string} image - The image of the pill to analyze (currently unused).
 * @returns {Promise<object>} A promise that resolves with the identified pill data.
 */
export function analyzePillImage(image) {
    console.log("AI analysis started for image:", image);

    return new Promise(resolve => {
        // Simulate network latency and AI processing time
        setTimeout(() => {
            // In a real scenario, the AI would return data based on the image.
            // Here, we just pick a random pill from our mock database.
            const detectedPill = MOCK_PILL_DATABASE[Math.floor(Math.random() * MOCK_PILL_DATABASE.length)];
            
            console.log("AI analysis complete. Detected:", detectedPill);
            resolve(detectedPill);
        }, 2500); // Simulate 2.5 seconds of processing time
    });
}
