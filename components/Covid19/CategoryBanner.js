import Link from 'next/link';

const CategoryBanner = () => {
    return(
        <div className="grocery-categories-banner-area">
            <div className="ui grid">
                <div className="four wide column">
                    <div className="single-grocery-categories-box">
                        <img src="https://res.cloudinary.com/dye38whh3/image/upload/v1602682414/bebidas/zhsxxdlr81vkeeigcwm6.jpg" alt="Categories" />

                        <div className="content">
                            <span>50% OFF</span>
                            <h3>Sanitizer</h3>
                            <Link href="/products?term=medical">
                                <a className="default-btn">Shop Now</a>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="four wide column">
                    <div className="single-grocery-categories-box">
                        <img src="https://res.cloudinary.com/dye38whh3/image/upload/v1602682979/bebidas/rpdai3skyoeyfzwt5ns7.jpg" alt="Categories" />

                        <div className="content">
                            <span>40% OFF</span>
                            <h3>Masks</h3>
                            <Link href="/products?term=medical">
                                <a className="default-btn">Shop Now</a>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="four wide column">
                    <div className="single-grocery-categories-box">
                        <img src="https://res.cloudinary.com/dye38whh3/image/upload/v1602682845/bebidas/limssms92korfurw6cfo.jpg" alt="Categories" />

                        <div className="content">
                            <span>30% OFF</span>
                            <h3>PPE</h3>
                            <Link href="/products?term=medical">
                                <a className="default-btn">Shop Now</a>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="four wide column">
                    <div className="single-grocery-categories-box">
                        <img src="https://res.cloudinary.com/dye38whh3/image/upload/v1602676947/bebidas/fd4ujqcc7hpq2fgpswn9.jpg" alt="Categories" />

                        <div className="content">
                            <span>20% OFF</span>
                            <h3>Gloves</h3>
                            <Link href="/products?term=medical">
                                <a className="default-btn">Shop Now</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryBanner;