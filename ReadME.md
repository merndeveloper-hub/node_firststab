1. user and pro registeration
   mobile ==>

2. verrify and expirt in email code

3. userType:user/pro add verify and ofrget process

4. get categories

////////////PHASE 1 //////////
USER AND PRO SIGNUP AND LOGIN 
FORGET PASSWORD BOTH
CREATE CATEGORIES ==> MAIN CATEROITE AND SUBCATEGORIE



{

Business name:"",
phone number:"",
address:"",
categories data
sub categoreis with select type


}

Regitstration remove city and zipcode
update register 
stripe


////////
Search Category as a guest,user,etc..


///
get professional 
userDeatil replace professionalId

//http://localhost:5000/api/v1/user/home/getprofessional
is mein bs name and rating

professinId joi ke validation dekhni hian


///ask the theo/////
jb a=hum koi service lete hai is mein end time nhi btate ktni derh ke service pro de ga inchat,virtual,inperson

////////ER DIAGRAM///
https://dbdiagram.io/d


// User table
Table users {
    id SERIAL [primary key]
    first_name VARCHAR(50)
    last_name VARCHAR(50)
    email VARCHAR(100) [unique, not null]
    profile TEXT
    country_code VARCHAR(10)
    video TEXT
    address_type VARCHAR(50)
    address_line1 VARCHAR(255)
    address_line2 VARCHAR(255)
    state VARCHAR(100)
    date VARCHAR(50)  // If it's a string, otherwise use DATE
    time VARCHAR(50)  // If it's a string, otherwise use TIME
    mobile VARCHAR(20) [unique, not null]
    password VARCHAR(255) [not null]
    business_name VARCHAR(255)
    business_address TEXT
    business_phone_no VARCHAR(20)
    city VARCHAR(100)
    zip_code VARCHAR(20)
    total_pro INT [default: 0]
    user_type VARCHAR(50) [note: 'Enum: user, pro']
    status VARCHAR(50) [default: 'Active', note: 'Enum: Active, Disabled']
    created_date TIMESTAMP [default: `CURRENT_TIMESTAMP`]
    created_at TIMESTAMP
    updated_at TIMESTAMP
}

// Attempt table
Table attempts {
    id SERIAL [primary key]
    user_id INTEGER [not null] // Foreign key referencing users table
    no_of_attempts INT [default: 0, not null]
    block_duration TIMESTAMP [default: `CURRENT_TIMESTAMP`]
    block BOOLEAN [default: false, note: 'Enum: true, false']
    created_at TIMESTAMP
    updated_at TIMESTAMP
}


// Token table
Table tokens {
    id SERIAL [primary key]
    user_id INTEGER [not null] // Foreign key referencing users table
    token TEXT [unique, not null]
    expires_at TIMESTAMP
    type VARCHAR(20) [not null, note: 'Enum: access, refresh']
    created_at TIMESTAMP
    updated_at TIMESTAMP
}

//User address 
Table addresses {
    id SERIAL [primary key]
    user_id INTEGER [not null] // Foreign key referencing users table
    address_type VARCHAR(20) [note: 'Enum: work, other, home']
    address_line1 TEXT
    address_line2 TEXT
    state VARCHAR(100)
    city VARCHAR(100)
    zip_code VARCHAR(20)
    mobile VARCHAR(20)
    created_date TIMESTAMP [default: `CURRENT_TIMESTAMP`]
    created_at TIMESTAMP
    updated_at TIMESTAMP
}

//User/Pro Contact-Us
Table contact_us {
    id SERIAL [primary key]
    user_id INTEGER // Foreign key referencing users table
    full_name VARCHAR(255)
    phone_number VARCHAR(20)
    email VARCHAR(100)
    subject VARCHAR(255) [not null]
    message TEXT [not null]
    created_at TIMESTAMP
    updated_at TIMESTAMP
}

// Relationship with users table
Ref: contact_us.user_id > users.id



// Relationship with users table
Ref: addresses.user_id > users.id


// Relationship with users table
Ref: attempts.user_id > users.id

// Relationship with users table
Ref: tokens.user_id > users.id


// Admin Categorie
Table categories {
    id SERIAL [primary key]
    name VARCHAR(100) [not null]
    image TEXT [not null]
    icon TEXT [not null]
    commission DECIMAL(10,2) [not null]
    tax_code VARCHAR(50)
    description TEXT [default: '', note: 'Optional category description']
    status VARCHAR(20) [default: 'Active', note: 'Enum: Active, Inactive']
    type VARCHAR(20) [default: 'Blue', note: 'Enum: Blue, White']
    is_remote VARCHAR(10) [default: 'No', note: 'Enum: No, Yes']
    add_to_home VARCHAR(20) [default: 'default', note: 'Enum: default, Top left, Top Right, bottom']
    created_date TIMESTAMP [default: `CURRENT_TIMESTAMP`]
    created_at TIMESTAMP
    updated_at TIMESTAMP
}


//Admin Sub-categorie
Table sub_categories {
    id SERIAL [primary key]
    category_id INTEGER [not null] // Foreign key referencing categories table
    category_name VARCHAR(100) [not null] // Redundant, but kept for reference
    name VARCHAR(100) [not null]
    image TEXT [not null]
    icon TEXT [not null]
    is_remote BOOLEAN [default: false]
    is_chat BOOLEAN [default: false]
    is_virtual BOOLEAN [default: false]
    is_in_person BOOLEAN [default: false]
    price DECIMAL(10,2) [not null]
    description TEXT [not null]
    add_to_home VARCHAR(10) [default: 'No', note: 'Enum: Yes, No']
    status VARCHAR(20) [default: 'Active', note: 'Enum: Active, Inactive']
    created_date TIMESTAMP [default: `CURRENT_TIMESTAMP`]
    created_at TIMESTAMP
    updated_at TIMESTAMP
}

// Relationship with categories table
Ref: sub_categories.category_id > categories.id


//Pro Business
Table pro_businesses {
    id SERIAL [primary key]
    user_id INTEGER [not null] // Foreign key referencing users table
    name VARCHAR(255) [not null]
    address TEXT [not null]
    phone_no VARCHAR(20) [not null]
    created_at TIMESTAMP
    updated_at TIMESTAMP
}

// Relationship with users table
Ref: pro_businesses.user_id > users.id

//Admin add Pages
Table contents {
    id SERIAL [primary key]
    title VARCHAR(255)
    page_code VARCHAR(255)
    image TEXT
    contents TEXT
    status VARCHAR(20) [default: 'Active', note: 'Enum: Active, Inactive']
    is_system_page VARCHAR(10) [default: 'No', note: 'Enum: No, Yes']
    created_date TIMESTAMP [default: `CURRENT_TIMESTAMP`]
    created_at TIMESTAMP
    updated_at TIMESTAMP
}

//Admin Faq Id
Table faq_categories {
    id SERIAL [primary key]
    name VARCHAR(255)
    status VARCHAR(20) [default: 'Active', note: 'Enum: Active, Inactive']
    created_date TIMESTAMP [default: `CURRENT_TIMESTAMP`]
    created_at TIMESTAMP
    updated_at TIMESTAMP
}

//Admin Faq Quesions add
Table faq_questions {
    id SERIAL [primary key]
    title VARCHAR(255)
    answer TEXT
    display_position INT
    faq_category_name VARCHAR(255)
    faq_category_id INTEGER [ref: > faq_categories.id]
    status VARCHAR(20) [default: 'Active', note: 'Enum: Active, Inactive']
    created_date TIMESTAMP [default: `CURRENT_TIMESTAMP`]
    created_at TIMESTAMP
    updated_at TIMESTAMP
}

//OTP Verification
Table user_otp_verifications {
    id SERIAL [primary key]
    user_email VARCHAR(255)
    user_type VARCHAR(20) [note: 'Enum: user, pro']
    otp VARCHAR(10)
    created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
    expires_at TIMESTAMP
    updated_at TIMESTAMP
}

//Payments
Table payments {
    id SERIAL [primary key]
    user_id INTEGER [not null, ref: > users.id] 
    amount DECIMAL(10,2) [not null]
    card_number VARCHAR(20) [not null]
    card_expiry_date VARCHAR(10) [not null]
    card_cvc VARCHAR(5) [not null]
    holding_name VARCHAR(100)
    currency VARCHAR(10) [default: 'usd']
    payment_method VARCHAR(10) [not null, note: 'Enum: stripe, paypal']
    transaction_id VARCHAR(255) [not null]
    status VARCHAR(10) [default: 'pending', note: 'Enum: pending, success, failed']
    created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
    updated_at TIMESTAMP
}

// User Booked Service
Table user_bookings {
    id SERIAL [primary key]
    user_id INTEGER [not null, ref: > users.id]
    address_id INTEGER [ref: > addresses.id]
    image TEXT
    problem_desc TEXT [not null]
    professional_id INTEGER [ref: > users.id]
    category_id INTEGER [not null, ref: > categories.id]
    sub_category_id INTEGER [not null, ref: > sub_categories.id]
    service_type VARCHAR(50)
    start_date TIMESTAMP
    end_date TIMESTAMP
    start_time TIMESTAMP
    end_time TIMESTAMP
    created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

//User Booked Service Details
Table bookings {
    id SERIAL [primary key]
    user_id INTEGER [not null, ref: > users.id]
    professional_id INTEGER [ref: > users.id]
    book_service_id INTEGER [ref: > user_bookings.id]
    category_id INTEGER [ref: > categories.id]
    sub_category_id INTEGER [ref: > sub_categories.id]
    request_id VARCHAR(255) [not null, default: '0']
    cancelled_reason TEXT [default: '']
    service_type VARCHAR(50) [not null, note: 'chat, video, remote, inPerson']
    service_name TEXT [not null]
    type_of_work TEXT [not null]
    problem_desc TEXT [not null]
    quotes_received INTEGER [default: 0]
    desired_date_time TIMESTAMP [not null]
    service_assign VARCHAR(50) [default: 'Random', note: 'Professional, Random']
    service_status VARCHAR(50) [default: 'Pending', note: 'Pending, Cancelled, Approved, Completed']
    created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}


//Pro Create Categories
Table pro_categories {
    id SERIAL [primary key]
    pro_id INTEGER [not null, ref: > users.id]
    price DECIMAL(10,2) [not null]
    category_id INTEGER [not null, ref: > categories.id]
    created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}
//Pro Create Categories
Table pro_category_sub_categories {
    id SERIAL [primary key]
    pro_category_id INTEGER [not null, ref: > pro_categories.id]
    sub_category_id INTEGER [not null, ref: > sub_categories.id]
    is_remote BOOLEAN [default: false]
    is_chat BOOLEAN [default: false]
    is_virtual BOOLEAN [default: false]
    is_in_person BOOLEAN [default: false]
}


