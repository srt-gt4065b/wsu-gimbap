// 앱 전역 변수
let currentUser = null;
let cart = [];
let orderHistory = [];
let currentOrderType = 'instant';

// Firebase 초기화 (사용자가 설정할 부분)
// Firebase 설정은 firebase-config.js에서 관리

// 데모용 메뉴 데이터
const menuData = {
    tuna: {
        id: 'tuna',
        name: '참치김밥',
        description: '신선한 참치와 아삭한 단무지',
        price: 3500,
        discountedPrice: 2975,
        discountRate: 15,
        image: '🍙',
        category: 'gimbap',
        isPopular: true,
        prepTime: 5,
        rating: 4.8,
        orderCount: 47,
        allergens: ['어류'],
        calories: 320
    },
    bulgogi: {
        id: 'bulgogi',
        name: '불고기김밥',
        description: '달콤한 불고기와 신선한 야채',
        price: 4000,
        discountedPrice: 3400,
        discountRate: 15,
        image: '🥩',
        category: 'gimbap',
        isPopular: true,
        prepTime: 7,
        rating: 4.7,
        orderCount: 35,
        allergens: ['대두'],
        calories: 380
    },
    cheese: {
        id: 'cheese',
        name: '치즈김밥',
        description: '고소한 치즈가 가득한 인기메뉴',
        price: 3800,
        discountedPrice: 2660,
        discountRate: 30,
        image: '🧀',
        category: 'gimbap',
        isSpecial: true,
        prepTime: 6,
        rating: 4.6,
        orderCount: 28,
        allergens: ['유제품'],
        calories: 350
    },
    beef: {
        id: 'beef',
        name: '소고기김밥',
        description: '부드러운 소고기와 신선한 야채',
        price: 4500,
        discountedPrice: 3825,
        discountRate: 15,
        image: '🥓',
        category: 'gimbap',
        prepTime: 8,
        rating: 4.5,
        orderCount: 22,
        allergens: ['대두'],
        calories: 420
    },
    kimchi: {
        id: 'kimchi',
        name: '김치김밥',
        description: '매콤한 김치와 고소한 참기름',
        price: 3200,
        discountedPrice: 2720,
        discountRate: 15,
        image: '🌶️',
        category: 'gimbap',
        prepTime: 5,
        rating: 4.4,
        orderCount: 18,
        allergens: [],
        calories: 290
    }
};

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('으능정이 우송 앱이 시작되었습니다.');
    
    // 스플래시 화면 표시
    setTimeout(() => {
        hideSplash();
        showWelcome();
    }, 2000);
    
    // 이벤트 리스너 설정
    setupEventListeners();
    
    // 데모용 사용자 설정
    setupDemoUser();
});

// 스플래시 화면 숨기기
function hideSplash() {
    const splash = document.getElementById('splash-screen');
    if (splash) {
        splash.style.display = 'none';
    }
}

// 웰컴 화면 표시
function showWelcome() {
    hideAllScreens();
    const welcomeScreen = document.getElementById('welcome-screen');
    if (welcomeScreen) {
        welcomeScreen.classList.remove('hidden');
    }
}

// 로그인 화면 표시
function showLogin() {
    hideAllScreens();
    const loginScreen = document.getElementById('login-screen');
    if (loginScreen) {
        loginScreen.classList.remove('hidden');
    }
}

// 회원가입 화면 표시
function showSignup() {
    hideAllScreens();
    const signupScreen = document.getElementById('signup-screen');
    if (signupScreen) {
        signupScreen.classList.remove('hidden');
    }
}

// 모든 화면 숨기기
function hideAllScreens() {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.add('hidden');
    });
}

// 로그인 처리 (데모용)
function login() {
    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;
    
    if (!email || !password) {
        alert('이메일과 비밀번호를 입력해주세요.');
        return;
    }
    
    // 데모용 로그인 성공 처리
    currentUser = {
        id: 'demo-user',
        name: '김우송',
        email: email,
        department: '컴퓨터정보학과',
        studentId: '202012345',
        membership: {
            tier: 'GOLD',
            discountRate: 0.15,
            points: 1250
        }
    };
    
    alert('로그인되었습니다!');
    goToMenu();
}

// 회원가입 처리 (데모용)
function signup() {
    const name = document.getElementById('name')?.value;
    const phone = document.getElementById('phone')?.value;
    const department = document.getElementById('department')?.value;
    const studentId = document.getElementById('student-id')?.value;
    const agreeTerms = document.getElementById('agree-terms')?.checked;
    
    if (!name || !phone || !department || !studentId || !agreeTerms) {
        alert('필수 정보를 모두 입력하고 약관에 동의해주세요.');
        return;
    }
    
    // 데모용 회원가입 성공 처리
    currentUser = {
        id: 'demo-user',
        name: name,
        department: department,
        studentId: studentId,
        membership: {
            tier: 'BRONZE',
            discountRate: 0.05,
            points: 0
        }
    };
    
    alert('멤버십 가입이 완료되었습니다! 첫 주문 20% 할인 쿠폰이 발급되었어요.');
    goToMenu();
}

// 메뉴 화면으로 이동
function goToMenu() {
    window.location.href = 'menu.html';
}

// 장바구니에 상품 추가
function addToCart(menuId) {
    const menu = menuData[menuId];
    if (!menu) return;
    
    // 기존 아이템이 있는지 확인
    const existingItem = cart.find(item => item.id === menuId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: menuId,
            name: menu.name,
            price: menu.discountedPrice || menu.price,
            quantity: 1,
            image: menu.image
        });
    }
    
    updateCartUI();
    
    // 간단한 피드백
    showToast(`${menu.name}이 장바구니에 추가되었습니다.`);
}

// 장바구니 UI 업데이트
function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    if (cartCount && cartTotal) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        cartCount.textContent = totalItems;
        cartTotal.textContent = `₩${totalPrice.toLocaleString()}`;
        
        // 장바구니가 비어있으면 숨기기
        const cartFloat = document.querySelector('.cart-float');
        if (cartFloat) {
            cartFloat.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }
}

// 장바구니 화면 표시
function showCart() {
    hideAllScreens();
    const cartScreen = document.getElementById('cart-screen');
    if (cartScreen) {
        cartScreen.classList.remove('hidden');
        renderCartItems();
    }
}

// 장바구니 화면 숨기기
function hideCart() {
    hideAllScreens();
    const menuScreen = document.getElementById('menu-screen');
    if (menuScreen) {
        menuScreen.classList.remove('hidden');
    }
}

// 장바구니 아이템 렌더링
function renderCartItems() {
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: #666;">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>장바구니가 비어있습니다.</p>
                <button class="btn-primary" onclick="hideCart()">메뉴 보러가기</button>
            </div>
        `;
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="menu-image">
                <div class="image-placeholder">${item.image}</div>
            </div>
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <span class="price">₩${item.price.toLocaleString()}</span>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <button class="btn-danger" onclick="removeFromCart('${item.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    updateCartSummary();
}

// 수량 업데이트
function updateQuantity(itemId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(itemId);
        return;
    }
    
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = newQuantity;
        renderCartItems();
        updateCartUI();
    }
}

// 장바구니에서 아이템 제거
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    renderCartItems();
    updateCartUI();
}

// 장바구니 전체 삭제
function clearCart() {
    if (confirm('장바구니를 비우시겠습니까?')) {
        cart = [];
        renderCartItems();
        updateCartUI();
    }
}

// 장바구니 요약 업데이트
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountRate = currentUser?.membership?.discountRate || 0.05;
    const discount = Math.floor(subtotal * discountRate);
    const total = subtotal - discount;
    
    const subtotalEl = document.getElementById('subtotal');
    const discountEl = document.getElementById('discount');
    const totalEl = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (subtotalEl) subtotalEl.textContent = `₩${subtotal.toLocaleString()}`;
    if (discountEl) discountEl.textContent = `-₩${discount.toLocaleString()}`;
    if (totalEl) totalEl.textContent = `₩${total.toLocaleString()}`;
    
    // 결제 버튼 활성화/비활성화
    if (checkoutBtn) {
        checkoutBtn.disabled = cart.length === 0;
        checkoutBtn.textContent = cart.length > 0 ? `₩${total.toLocaleString()} 주문하기` : '주문하기';
    }
}

// 주문 유형 선택 화면 표시
function showOrderType() {
    window.location.href = 'order.html';
}

// 예약 주문 화면 표시
function showReservation() {
    alert('예약 주문 기능은 데모 버전에서 준비 중입니다.');
}

// 주문 유형 선택
function selectOrderType(type) {
    currentOrderType = type;
    
    switch (type) {
        case 'instant':
            alert('즉시 픽업이 선택되었습니다. 15분 후 픽업 가능합니다.');
            showCart();
            break;
        case 'reserved':
            alert('예약 주문이 선택되었습니다. 시간을 선택해주세요.');
            // 시간 선택 로직 추가 가능
            showCart();
            break;
        case 'delivery':
            alert('배달 주문이 선택되었습니다. 배달 정보를 입력해주세요.');
            showCart();
            break;
    }
}

// 결제 진행
function proceedToPayment() {
    if (cart.length === 0) {
        alert('장바구니가 비어있습니다.');
        return;
    }
    
    hideAllScreens();
    const paymentScreen = document.getElementById('payment-screen');
    if (paymentScreen) {
        paymentScreen.classList.remove('hidden');
        updatePaymentSummary();
    }
}

// 결제 요약 업데이트
function updatePaymentSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountRate = currentUser?.membership?.discountRate || 0.05;
    const discount = Math.floor(subtotal * discountRate);
    const total = subtotal - discount;
    
    const elements = {
        'payment-subtotal': `₩${subtotal.toLocaleString()}`,
        'payment-discount': `-₩${discount.toLocaleString()}`,
        'final-total': `₩${total.toLocaleString()}`,
        'selected-order-type': getOrderTypeText(currentOrderType),
        'selected-pickup-time': getPickupTimeText(currentOrderType)
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    });
}

// 주문 유형 텍스트 반환
function getOrderTypeText(type) {
    const texts = {
        instant: '즉시 픽업',
        reserved: '예약 주문',
        delivery: '배달'
    };
    return texts[type] || '즉시 픽업';
}

// 픽업 시간 텍스트 반환
function getPickupTimeText(type) {
    const now = new Date();
    const pickupTime = new Date(now.getTime() + 15 * 60000); // 15분 후
    
    if (type === 'instant') {
        return `약 ${pickupTime.getHours()}:${pickupTime.getMinutes().toString().padStart(2, '0')}`;
    } else if (type === 'delivery') {
        return '약 30분 후';
    }
    return '시간 선택';
}

// 쿠폰 적용
function applyCoupon() {
    const couponCode = document.getElementById('coupon-code')?.value;
    if (!couponCode) {
        alert('쿠폰 코드를 입력해주세요.');
        return;
    }
    
    // 데모용 쿠폰 처리
    if (couponCode === 'MIDTERM2024') {
        alert('중간고사 응원 쿠폰이 적용되었습니다! (추가 10% 할인)');
    } else {
        alert('유효하지 않은 쿠폰 코드입니다.');
    }
}

// 쿠폰 사용
function useCoupon(type) {
    if (type === 'birthday') {
        alert('생일 축하 쿠폰이 적용되었습니다! (30% 할인)');
    }
}

// 결제 처리
function processPayment() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;
    
    if (!paymentMethod) {
        alert('결제 수단을 선택해주세요.');
        return;
    }
    
    // 데모용 결제 처리
    showToast('결제를 처리하고 있습니다...');
    
    setTimeout(() => {
        // 주문 완료 처리
        const orderId = Math.floor(Math.random() * 1000) + 1;
        const order = {
            id: orderId,
            items: [...cart],
            type: currentOrderType,
            status: 'preparing',
            createdAt: new Date(),
            total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        };
        
        orderHistory.push(order);
        cart = []; // 장바구니 비우기
        updateCartUI();
        
        // 주문 상태 화면으로 이동
        showOrderStatus(orderId);
    }, 2000);
}

// 주문 상태 화면 표시
function showOrderStatus(orderId) {
    hideAllScreens();
    const orderStatusScreen = document.getElementById('order-status-screen');
    if (orderStatusScreen) {
        orderStatusScreen.classList.remove('hidden');
        
        // 주문 번호 업데이트
        const orderNumberEl = document.getElementById('order-number');
        if (orderNumberEl) {
            orderNumberEl.textContent = `#${orderId}`;
        }
        
        // 주문 상품 요약 업데이트
        updateOrderItemsSummary();
        
        // 상태 업데이트 시뮬레이션
        simulateOrderProgress();
    }
}

// 주문 상품 요약 업데이트
function updateOrderItemsSummary() {
    const orderItemsSummary = document.getElementById('order-items-summary');
    if (orderItemsSummary && orderHistory.length > 0) {
        const lastOrder = orderHistory[orderHistory.length - 1];
        orderItemsSummary.innerHTML = lastOrder.items.map(item => `
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>${item.name} x ${item.quantity}</span>
                <span>₩${(item.price * item.quantity).toLocaleString()}</span>
            </div>
        `).join('');
    }
}

// 주문 진행 상황 시뮬레이션
function simulateOrderProgress() {
    const steps = document.querySelectorAll('.status-step');
    let currentStep = 1;
    
    const updateStep = () => {
        if (currentStep < steps.length) {
            steps[currentStep].classList.remove('active');
            steps[currentStep].classList.add('completed');
            currentStep++;
            if (currentStep < steps.length) {
                steps[currentStep].classList.add('active');
            }
        }
    };
    
    // 5초마다 다음 단계로 진행 (데모용)
    setTimeout(updateStep, 5000);  // 조리 완료
    setTimeout(updateStep, 10000); // 픽업 가능
}

// 매장 전화
function callStore() {
    alert('매장에 전화를 겁니다: 042-123-4567');
}

// 프로필 화면 표시
function showProfile() {
    alert('마이페이지 기능은 데모 버전에서 준비 중입니다.');
}

// 주문 내역 표시
function showOrderHistory() {
    alert('주문 내역 기능은 데모 버전에서 준비 중입니다.');
}

// 이벤트 화면 표시
function showEvents() {
    alert('혜택 페이지는 데모 버전에서 준비 중입니다.');
}

// 관리자 페이지 기능들
function refreshData() {
    showToast('데이터를 새로고침했습니다.');
}

function updateOrderStatus(orderId, status) {
    showToast(`주문 #${orderId}의 상태가 업데이트되었습니다.`);
    
    // 실제로는 Firebase에 상태 업데이트
    console.log(`Order ${orderId} status updated to: ${status}`);
}

function sendNotification(orderId) {
    showToast(`주문 #${orderId} 고객에게 알림을 발송했습니다.`);
}

function showMenuManagement() {
    showModal('menu-modal');
}

function showEventManagement() {
    showModal('event-modal');
}

function showInventory() {
    alert('재고 관리 기능은 데모 버전에서 준비 중입니다.');
}

function showCustomerManagement() {
    alert('고객 관리 기능은 데모 버전에서 준비 중입니다.');
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
    }
}

// 토스트 메시지 표시
function showToast(message) {
    // 기존 토스트 제거
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // 새 토스트 생성
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #333;
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        z-index: 10000;
        font-size: 0.9rem;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // 애니메이션
    setTimeout(() => {
        toast.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// 이벤트 리스너 설정
function setupEventListeners() {
    // 학년 선택 버튼
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('grade-btn')) {
            document.querySelectorAll('.grade-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            e.target.classList.add('selected');
        }
        
        // 언어 선택 버튼
        if (e.target.classList.contains('lang-btn')) {
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
        }
        
        // 카테고리 버튼
        if (e.target.classList.contains('category-btn')) {
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
        }
        
        // 네비게이션 버튼
        if (e.target.classList.contains('nav-item')) {
            document.querySelectorAll('.nav-item').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
        }
    });
    
    // 모달 배경 클릭으로 닫기
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.add('hidden');
        }
    });
}

// 데모용 사용자 설정
function setupDemoUser() {
    // 데모용으로 사용자 로그인 상태 설정
    if (!currentUser) {
        currentUser = {
            id: 'demo-user',
            name: '김우송',
            email: 'student@woosong.ac.kr',
            department: '컴퓨터정보학과',
            studentId: '202012345',
            membership: {
                tier: 'GOLD',
                discountRate: 0.15,
                points: 1250
            }
        };
    }
}

// 페이지별 초기화 함수들
if (typeof window !== 'undefined') {
    // 현재 페이지에 따른 초기화
    const currentPage = window.location.pathname.split('/').pop();
    
    switch (currentPage) {
        case 'menu.html':
            // 메뉴 페이지 초기화
            document.addEventListener('DOMContentLoaded', function() {
                updateCartUI();
                setupDemoUser();
            });
            break;
            
        case 'order.html':
            // 주문 페이지 초기화
            document.addEventListener('DOMContentLoaded', function() {
                setupDemoUser();
            });
            break;
            
        case 'admin.html':
            // 관리자 페이지 초기화
            document.addEventListener('DOMContentLoaded', function() {
                console.log('관리자 페이지가 로드되었습니다.');
            });
            break;
    }
}

// 전역 함수로 내보내기 (필요한 경우)
window.gimbapApp = {
    login,
    signup,
    addToCart,
    showCart,
    hideCart,
    selectOrderType,
    processPayment,
    updateOrderStatus,
    showToast,
    goToMenu
};