const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const player = $('.player')
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = document.getElementById('audio');
const playBtn = $('.btn-toggle-play');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: "Dạo Này Em Sao",
            singer: "Nguyễn Vĩ",
            path: "./AudioFile/Dạo Này Em Sao (AIR Remix) - Nguyễn Vĩ  Giờ Người Nơi Phương Xa Ấy Có Biết Anh Đang Rất Đau Remix.mp3",
            image: "./Images/DaoNayEmSao.png",
        },
        {
            name: "Em Vội Quên",
            singer: "Gia Huy",
            path: "./AudioFile/EmVoiQuen.mp3",
            image: "./Images/EmVoiQuen.png",
        },
        {
            name: "Vở Kịch Của Em",
            singer: "Hồ Phong An",
            path: "./AudioFile/Vở Kịch Của Em - Vây Giữ REMIX (HuyN - Trường Alex) - Chạy Theo Những Cuộc Vui Tình Ta Giờ Phai Nhoà.mp3",
            image: "./Images/VoKichCuaEm.png",
        },
        {
            name: "Nói Có Sẽ Khó Nhưng Vui",
            singer: "AnhVu x Thazh Remix",
            path: "./AudioFile/Nói Có Sẽ Khó Nhưng Vui Remix TikTok - (AnhVu  Thazh Remix) Chào Làn Tóc Mây Trong Nắng Sớm Tik Tok.mp3",
            image: "./Images/NoiCoSeKhoNhungVui.png",
        },
        {
            name: "Gặp Em Đúng Lúc",
            singer: "QTrung Remix",
            path: "./AudioFile/GEDL x VC - QTrung Remix -- Nhạc Hot TikTok Remix Mới Nhất 2023.mp3",
            image: "./Images/gedl.png",
        },
        {
            name: "Khi Yêu Nào Đâu Ai Muốn",
            singer: "Trịnh Thiên Ân",
            path: "./AudioFile/Khi Yêu Nào Đâu Ai Muốn (Qinn Remix) - Trịnh Thiên Ân - Kết Thúc Phải Kết Thúc Chuyện Tình Anh Remix.mp3",
            image: "./Images/KhiYeuNaoDauAiMuon.png",
        },
        {
            name: "Nguyệt Hồng Phai",
            singer: "HUY TK x NH4T x PHA",
            path: "./AudioFile/NguyetHongPhai.mp3",
            image: "./Images/NguyetHongPhai.png",
        },
        {
            name: "Tình Ta Hai Ngã",
            singer: "AKI Khoa",
            path: "./AudioFile/Tình Ta Hai Ngã (AIR Remix) - AKI KHOA  Tại Sao Anh Còn Thương Em Mãi Remix TikTok 2024.mp3",
            image: "./Images/TinhTaHaiNga.png",
        },
        {
            name: "Cô Gái Vàng x Thích Hôn",
            singer: "Ducbui Ft. QTrung",
            path: "./AudioFile/Cô Gái Vàng x Thích Hôn - Ducbui Ft. QTrung Remix -- Nhạc Remix Hot Trend TikTok Mới Nhất 2024.mp3",
            image: "./Images/CoGaiVang.png",
        },
        {
            name: "Nhìn Em Lần Cuối",
            singer: "Minh Hạnh Ft. DC Tâm",
            path: "./AudioFile/Đừng Quay Đi Em Hãy Nhìn Lại Hay Là Em Hết Yêu Anh - Nhìn Em Lần Cuối REMIX 2023 (Bản Chuẩn Tiktok).mp3",
            image: "./Images/NhinEmLanCuoi.png",
        },
        {
            name: "Quá Khứ Anh Không Thể Quên",
            singer: "Dương Minh Tuấn",
            path: "./AudioFile/Quá Khứ Anh Không Thể Quên (RIN Music Remix) - Dương Minh Tuấn - Anh Cứ Nghĩ Tất Cả Yêu Dấu Remix.mp3",
            image: "./Images/QuaKhuAnhKhongTheQuen.png",
        },
        {
            name: "Anh Thương Em, Em thương ai",
            singer: "Đinh Huy Tùng",
            path: "./AudioFile/Anh Thương Em Em Thương Ai (Đức Louis Remix) - Đinh Tùng Huy - Nghĩ Đi Mà Xem Lúc Em Vừa Trượt Ngã.mp3",
            image: "./Images/AnhThuongEmEmThuongAi.png",
        }
    ],

    render: function() {
        // render: kết xuất-công việc add thẻ song vào playlist
        const htmls =this.songs.map(song => {
            return `
                <div class="song">
                    <!-- Thumbnail: ảnh nhỏ -->
                    <div class="thumb" style="background-image: url('${song.image}');"></div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        $('.playlist').innerHTML = htmls.join('')
    },

    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            }
        });
    },

    handleEvents: function() {
        // Công việc liên quan đến xử lý sự kiện
        const _this = this;

        const cd = document.querySelector('.cd');
        const cdWidth = cd.offsetWidth; // lấy ra kích thước đĩa cd
        // console.log(cdWidth);

        // lắng nghe sự kiện lăn scroll
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        // Xử lý khi click nút play
        playBtn.onclick = function() {
            if(_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }
        
        // play bài hát
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        }
        
        // pause bài hát
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }

        // tiến độ bài hát
        audio.ontimeupdate = function() {
            if(audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;
            }
        }

        // tua bài hát
        progress.onchange = function(e) {
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime;
        }

        // Xử lý CD quay
        const cdThumbAnimate = cdThumb.animate([
            {
                transform: 'rotate(360deg)'
            }
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause();

        // Next song
        nextBtn.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.nextSong();
            }
            audio.play();
        }

        // Prev song
        prevBtn.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.prevSong();
            }
            audio.play();
        }

        // RandomBtn
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom;
            randomBtn.classList.toggle('active', _this.isRandom);
        }

        // RepeatBtn
        repeatBtn.onclick = function(e) {
            _this.isRepeat = !_this.isRepeat;
            repeatBtn.classList.toggle('active', _this.isRepeat);
        }

        // Xử lý khi bài hát hết
        audio.onended = function() {
            if(_this.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        }
    },

    loadCurrentSong: function() {
        // Tải thông tin bài hát

        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;

        // console.log(heading, cdThumb, audio);
    },

    nextSong: function() {
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },

    prevSong: function() {
        this.currentIndex--;
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },

    playRandomSong: function() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while(newIndex === this.currentIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },

    start: function() {
        this.defineProperties();

        this.handleEvents();

        this.loadCurrentSong();

        this.nextSong();

        this.prevSong();

        this.render();
    }
}

app.start();