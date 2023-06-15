# React-Django-Razorpay-integration

## Clone this project
```
git clone https://github.com/Aashishkumar123/React-Django-Razorpay-integration
```
## Setup Django Project

### Install following dependencies
```
pip install django djangorestframework python-dotenv razorpay django-cors-headers
```

### create ```.env``` file, where manange.py file is located
```
RAZORPAY_KEY_ID= here add razorpay id key
RAZORPAY_KEY_SECRET= here add razorpay secret key
```

### run project
```
python manage.py runserver
```

## Setup React Project

### install npm packages, make sure your location should be where ```package.json``` file is located.
```
npm install .
```

### create ```.env``` file, where package.json file is located
```
REACT_APP_RAZORPAY_KEY_ID= here add razorpay id key
```

### run project
```
npm start
```

## Razorpay
1. Create an account razorpay to get the ```ID``` and ```SECRET``` key
2. You can follow this documentation https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration/

## Postman
Download postman collection from <a download href="https://github.com/Aashishkumar123/React-Django-Razorpay-integration/blob/master/razorpay.postman_collection.json">here</a>
