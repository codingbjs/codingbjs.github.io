// script.js
// 향후 JavaScript 기능을 이곳에 추가합니다.
console.log("VMS Interface Document is loaded.");

// script.js

// DOM이 완전히 로드되면 실행
document.addEventListener("DOMContentLoaded", function() {
    // nav.html 파일을 가져옴
    fetch("/nav.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text();
        })
        .then(data => {
            // 가져온 HTML 내용을 placeholder에 삽입
            document.getElementById("navbar-placeholder").innerHTML = data;

            // --- 현재 페이지 메뉴 활성화 로직 ---
            // 현재 페이지의 경로를 가져옴 (예: "/frame.html")
            const currentPage = window.location.pathname.split("/").pop();

            // 네비게이션 메뉴의 모든 링크를 선택
            const navLinks = document.querySelectorAll("#navbar-placeholder nav a");

            navLinks.forEach(link => {
                const linkPage = link.getAttribute("href");
                // 링크의 href와 현재 페이지 이름이 같으면 active 클래스 추가
                if (linkPage === currentPage) {
                    link.classList.add("active");
                }
            });
        })
        .catch(error => {
            console.error("Error fetching navigation:", error);
            document.getElementById("navbar-placeholder").innerHTML = "<p>메뉴를 불러오는데 실패했습니다.</p>";
        });
});

// 테이블 그룹 호버 기능
const opcodeTableBody = document.getElementById("opcode-list");
if (opcodeTableBody) {
    const rows = opcodeTableBody.querySelectorAll("tr[data-group]");

    rows.forEach(row => {
        // 마우스가 행에 들어왔을 때
        row.addEventListener("mouseover", (event) => {
            const group = event.currentTarget.dataset.group;
            if (!group) return;

            const groupedRows = opcodeTableBody.querySelectorAll(`tr[data-group="${group}"]`);
            groupedRows.forEach(r => r.classList.add("is-hovered"));
        });

        // 마우스가 행에서 나갔을 때
        row.addEventListener("mouseout", (event) => {
            const group = event.currentTarget.dataset.group;
            if (!group) return;

            const groupedRows = opcodeTableBody.querySelectorAll(`tr[data-group="${group}"]`);
            groupedRows.forEach(r => r.classList.remove("is-hovered"));
        });
    });
}