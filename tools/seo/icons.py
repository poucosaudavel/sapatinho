from playwright.sync_api import sync_playwright
svg=open(str(__import__('pathlib').Path(__file__).resolve().parents[2]/'site')+'/favicon.svg').read()
with sync_playwright() as p:
    b=p.chromium.launch()
    for name,size in [("logo.png",512),("apple-touch-icon.png",180),("favicon-48.png",48)]:
        pg=b.new_page(viewport={"width":size,"height":size})
        s=svg.replace("<svg ", '<svg width="%d" height="%d" ' % (size,size), 1)
        pg.set_content('<html><body style="margin:0;background:#0f2a22">'+s+'</body></html>')
        pg.screenshot(path=str(__import__('pathlib').Path(__file__).resolve().parents[2]/'site'/name)); pg.close()
    b.close()
