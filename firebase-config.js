// Firebase 설정 파일
// 사용자가 Firebase 프로젝트를 생성한 후 여기에 설정을 추가하세요.

// Firebase 설정 객체 (사용자가 Firebase Console에서 가져와서 채워넣을 부분)
const firebaseConfig = {
    // 여기에 Firebase 설정을 추가하세요
    // apiKey: "your-api-key",
    // authDomain: "your-project.firebaseapp.com",
    // projectId: "your-project-id",
    // storageBucket: "your-project.appspot.com",
    // messagingSenderId: "123456789",
    // appId: "your-app-id"
};

// Firebase 초기화 (실제 설정이 있을 때만 초기화)
let app = null;
let auth = null;
let db = null;

try {
    // Firebase 설정이 있는지 확인
    if (firebaseConfig.apiKey) {
        // Firebase 초기화
        app = firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();
        db = firebase.firestore();
        
        console.log('Firebase가 성공적으로 초기화되었습니다.');
        
        // 인증 상태 변화 감지
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log('사용자가 로그인되었습니다:', user.email);
                handleUserLogin(user);
            } else {
                console.log('사용자가 로그아웃되었습니다.');
                handleUserLogout();
            }
        });
        
    } else {
        console.log('Firebase 설정이 없습니다. 데모 모드로 실행됩니다.');
    }
} catch (error) {
    console.error('Firebase 초기화 오류:', error);
    console.log('데모 모드로 실행됩니다.');
}

// Firebase 인증 함수들
const firebaseAuth = {
    // 이메일/비밀번호로 회원가입
    async signUp(email, password, userData) {
        try {
            if (!auth) {
                console.log('데모 모드: 회원가입 시뮬레이션');
                return { success: true, user: { email, ...userData } };
            }
            
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
            
            // Firestore에 사용자 추가 정보 저장
            await db.collection('users').doc(user.uid).set({
                email: email,
                name: userData.name,
                phone: userData.phone,
                department: userData.department,
                studentId: userData.studentId,
                grade: userData.grade,
                nationality: userData.nationality,
                languagePref: userData.languagePref,
                allergyInfo: userData.allergyInfo,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                membership: {
                    tier: 'BRONZE',
                    points: 0,
                    totalOrders: 0,
                    totalSpent: 0,
                    discountRate: 0.05
                }
            });
            
            return { success: true, user: user };
        } catch (error) {
            console.error('회원가입 오류:', error);
            return { success: false, error: error.message };
        }
    },
    
    // 이메일/비밀번호로 로그인
    async signIn(email, password) {
        try {
            if (!auth) {
                console.log('데모 모드: 로그인 시뮬레이션');
                return { success: true, user: { email } };
            }
            
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            console.error('로그인 오류:', error);
            return { success: false, error: error.message };
        }
    },
    
    // 로그아웃
    async signOut() {
        try {
            if (!auth) {
                console.log('데모 모드: 로그아웃 시뮬레이션');
                return { success: true };
            }
            
            await auth.signOut();
            return { success: true };
        } catch (error) {
            console.error('로그아웃 오류:', error);
            return { success: false, error: error.message };
        }
    }
};

// Firestore 데이터베이스 함수들
const firebaseDB = {
    // 사용자 정보 가져오기
    async getUserData(uid) {
        try {
            if (!db) {
                console.log('데모 모드: 사용자 데이터 시뮬레이션');
                return null;
            }
            
            const doc = await db.collection('users').doc(uid).get();
            if (doc.exists) {
                return doc.data();
            }
            return null;
        } catch (error) {
            console.error('사용자 데이터 가져오기 오류:', error);
            return null;
        }
    },
    
    // 주문 저장
    async saveOrder(orderData) {
        try {
            if (!db) {
                console.log('데모 모드: 주문 저장 시뮬레이션', orderData);
                return { success: true, orderId: 'demo-' + Date.now() };
            }
            
            const docRef = await db.collection('orders').add({
                ...orderData,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            return { success: true, orderId: docRef.id };
        } catch (error) {
            console.error('주문 저장 오류:', error);
            return { success: false, error: error.message };
        }
    },
    
    // 주문 목록 가져오기
    async getOrders(userId) {
        try {
            if (!db) {
                console.log('데모 모드: 주문 목록 시뮬레이션');
                return [];
            }
            
            const snapshot = await db.collection('orders')
                .where('userId', '==', userId)
                .orderBy('createdAt', 'desc')
                .get();
                
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('주문 목록 가져오기 오류:', error);
            return [];
        }
    },
    
    // 메뉴 데이터 가져오기
    async getMenuData() {
        try {
            if (!db) {
                console.log('데모 모드: 메뉴 데이터 시뮬레이션');
                return Object.values(menuData || {});
            }
            
            const snapshot = await db.collection('menu').get();
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('메뉴 데이터 가져오기 오류:', error);
            return [];
        }
    },
    
    // 이벤트 데이터 가져오기
    async getEvents() {
        try {
            if (!db) {
                console.log('데모 모드: 이벤트 데이터 시뮬레이션');
                return [];
            }
            
            const snapshot = await db.collection('events')
                .where('isActive', '==', true)
                .where('endDate', '>=', new Date())
                .get();
                
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('이벤트 데이터 가져오기 오류:', error);
            return [];
        }
    }
};

// 실시간 주문 관리 (관리자용)
const orderManagement = {
    // 실시간 주문 리스닝
    startOrderListener(callback) {
        if (!db) {
            console.log('데모 모드: 실시간 주문 리스닝 시뮬레이션');
            return () => {}; // 빈 unsubscribe 함수 반환
        }
        
        return db.collection('orders')
            .where('status', 'in', ['pending', 'preparing', 'ready'])
            .orderBy('createdAt', 'desc')
            .onSnapshot((snapshot) => {
                const orders = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                callback(orders);
            });
    },
    
    // 주문 상태 업데이트
    async updateOrderStatus(orderId, status) {
        try {
            if (!db) {
                console.log('데모 모드: 주문 상태 업데이트 시뮬레이션', orderId, status);
                return { success: true };
            }
            
            await db.collection('orders').doc(orderId).update({
                status: status,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            return { success: true };
        } catch (error) {
            console.error('주문 상태 업데이트 오류:', error);
            return { success: false, error: error.message };
        }
    }
};

// 푸시 알림 (Firebase Cloud Messaging)
const pushNotification = {
    // FCM 토큰 가져오기
    async getToken() {
        try {
            if (!firebase.messaging) {
                console.log('데모 모드: FCM 토큰 시뮬레이션');
                return 'demo-fcm-token';
            }
            
            const messaging = firebase.messaging();
            const token = await messaging.getToken();
            return token;
        } catch (error) {
            console.error('FCM 토큰 가져오기 오류:', error);
            return null;
        }
    },
    
    // 알림 권한 요청
    async requestPermission() {
        try {
            if (!firebase.messaging) {
                console.log('데모 모드: 알림 권한 요청 시뮬레이션');
                return true;
            }
            
            const permission = await Notification.requestPermission();
            return permission === 'granted';
        } catch (error) {
            console.error('알림 권한 요청 오류:', error);
            return false;
        }
    }
};

// 사용자 인증 상태 변화 처리
function handleUserLogin(user) {
    // 사용자 로그인 시 처리할 작업들
    console.log('사용자 로그인 처리:', user.email);
    
    // 사용자 데이터 가져오기
    if (db) {
        firebaseDB.getUserData(user.uid).then(userData => {
            if (userData) {
                // 전역 사용자 객체 업데이트
                window.currentUser = {
                    id: user.uid,
                    email: user.email,
                    ...userData
                };
            }
        });
    }
}

function handleUserLogout() {
    // 사용자 로그아웃 시 처리할 작업들
    console.log('사용자 로그아웃 처리');
    window.currentUser = null;
    
    // 필요한 경우 로그인 페이지로 리다이렉트
    // window.location.href = 'index.html';
}

// Firebase 유틸리티 함수들
const firebaseUtils = {
    // 타임스탬프를 Date 객체로 변환
    timestampToDate(timestamp) {
        if (!timestamp) return null;
        if (timestamp.toDate) {
            return timestamp.toDate();
        }
        return new Date(timestamp);
    },
    
    // 현재 사용자 ID 가져오기
    getCurrentUserId() {
        if (!auth || !auth.currentUser) return null;
        return auth.currentUser.uid;
    },
    
    // Firebase 연결 상태 확인
    isConnected() {
        return !!app;
    }
};

// Firebase 설정 상태를 콘솔에 출력
console.log('Firebase 설정 상태:', {
    initialized: !!app,
    auth: !!auth,
    firestore: !!db,
    mode: app ? 'Firebase' : 'Demo'
});

// 전역 객체로 내보내기
if (typeof window !== 'undefined') {
    window.firebaseAuth = firebaseAuth;
    window.firebaseDB = firebaseDB;
    window.orderManagement = orderManagement;
    window.pushNotification = pushNotification;
    window.firebaseUtils = firebaseUtils;
}