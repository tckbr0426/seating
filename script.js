document.addEventListener('DOMContentLoaded', () => {
    const drawBtn = document.getElementById('drawBtn');
    const totalStudentsInput = document.getElementById('totalStudents');
    const pickCountInput = document.getElementById('pickCount');
    const resultText = document.getElementById('resultText');
    const celebrationSound = document.getElementById('celebrationSound');

    drawBtn.addEventListener('click', () => {
        const totalStudents = parseInt(totalStudentsInput.value);
        const pickCount = parseInt(pickCountInput.value);

        // 1. 입력값 확인 (오류 방지)
        if (isNaN(totalStudents) || isNaN(pickCount) || totalStudents < 1 || pickCount < 1) {
            alert('숫자를 정확히 입력해 주세요!');
            return;
        }

        if (pickCount > totalStudents) {
            alert('뽑을 학생 수가 전체 학생 수보다 많습니다. 다시 확인해 주세요!');
            return;
        }

        // 2. 1번부터 끝번호까지 배열 만들기
        let students = [];
        for (let i = 1; i <= totalStudents; i++) {
            students.push(i);
        }

        // 3. 번호 랜덤으로 섞기 (피셔-예이츠 셔플 알고리즘)
        for (let i = students.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [students[i], students[j]] = [students[j], students[i]];
        }

        // 4. 뽑을 인원수만큼 잘라내기
        const winners = students.slice(0, pickCount);

        // 5. 시각적 긴장감 주기 (두근두근 효과)
        resultText.classList.remove('pop-animation');
        resultText.innerHTML = '🥁 두근두근... 🥁';
        drawBtn.disabled = true; // 추첨 중 버튼 연타 방지
        
        // 소리 정지 및 초기화 (연속으로 누를 때 대비)
        celebrationSound.pause();
        celebrationSound.currentTime = 0;

        // 6. 1.5초 뒤에 결과 발표 및 소리 재생
        setTimeout(() => {
            // 오름차순으로 보기 좋게 정렬
            winners.sort((a, b) => a - b); 
            
            resultText.innerHTML = `🎊 <span class="highlight">${winners.join(', ')}</span> 번 학생! 🎊`;
            resultText.classList.add('pop-animation');
            
            // 박수 소리 재생
            celebrationSound.play();
            
            drawBtn.disabled = false;
        }, 1500);
    });
});
