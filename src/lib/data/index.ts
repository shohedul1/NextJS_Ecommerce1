export const Menu = [
    {
        id: 1,
        name: 'Home',
        link: "/"
    },
    {
        id: 2,
        name: 'Top Rated',
        link: "/toprated"
    },
    {
        id: 3,
        name: 'Kind Wear',
        link: "/kindwear"
    },
    {
        id: 4,
        name: 'Mens Wear',
        link: "/menswear"
    },
];

export const DropdownLinks = [
    {
        id: 1,
        name: "Trending Products",
        link: '/trending'
    },
    {
        id: 3,
        name: "Top Rated",
        link: '/toprated'
    }
];


export const TestimonialData = [
    {
        id: 1,
        name: "Victor",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
        img: "https://picsum.photos/101/101",
    },
    {
        id: 2,
        name: "Satya Nadella",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
        img: "https://picsum.photos/102/102",
    },
    {
        id: 3,
        name: "Virat Kohli",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
        img: "https://picsum.photos/104/104",
    },
    {
        id: 5,
        name: "Sachin Tendulkar",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
        img: "https://picsum.photos/103/103",
    },
];

export const FooterLinks = [
    {
        title: "Home",
        link: "/",
    },
    {
        title: "Top product",
        link: "/toprated",
    },
    {
        title: "Blog",
        link: "https://user-blog-xi.vercel.app",
    },
];



export interface Product {
    id: number;
    img: string;
    title: string;
    description: string;
    category: string;
    rating: number;
    color: string;
    price: string;
    quanty: number;
    aosDelay: [{
        id: string;
        url: string
    }]
}

