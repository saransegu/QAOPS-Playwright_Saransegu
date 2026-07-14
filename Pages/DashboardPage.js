class DashboardPage
{
constructor(page)
{
    this.page = page;
    this.products = page.locator(".card-body");
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("button[routerlink*='cart']").nth(0);
    this.orders = page.locator("button[routerlink*='myorders']");
    this.cartitem = page.locator(".infoWrap");
    this.checkoutButton = page.locator("text=Checkout");

}

async searchProductAddCart(productName)
{
   
    const titles= await this.productsText.allTextContents();
    console.log(titles);
    const count = await this.products.count();
    for(let i =0; i < count; ++i)
    {
    if(await this.products.nth(i).locator("b").textContent() === productName)
    {
        //add to cart
        await this.products.nth(i).locator("text= Add To Cart").click();
        break;
     }
    }
}

async navigateToOrders()
{
    await this.orders.click();
}


async navigateToCart()
{
    await this.cart.click();
    await this.cartitem.waitFor({ state: 'visible' });

}
async checkout() {
    await this.checkoutButton.click();
}
}
module.exports = {DashboardPage};