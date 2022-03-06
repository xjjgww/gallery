import sys

pages = ['city', 'cook', 'flower', 'outdoor']

class subpage:
    title = ''
    desc = ''
    active = ["", "", "", ""]

    def __init__(self, tt, dd, aa):
        self.title = tt
        self.desc = dd
        self.active = aa

pages = {
    "city" : subpage("Cities", "Some places I lived in or visited.", [' class="active"', '', '', '']),
    "cook" : subpage("Foods I Made", "I cook for myself because Uber Eats is too expensive.", ['', ' class="active"', '', '']),
    "flower" : subpage("Flowers In Cities", "Welcome to my virtual garden.", ['', '', ' class="active"', '']),
    "outdoor" : subpage("Nature", "Actually I'm not an outdoor person... at all.", ['', '', '', ' class="active"']),
}

with open('template/template.html', 'r') as f:
    template = f.read()
with open('template/header.html', 'r') as f:
    header = f.read()
with open('template/nav.html', 'r') as f:
    nav = f.read()
with open('template/footer.html', 'r') as f:
    footer = f.read()

for page in pages:
    print('=> ' + page)

    contents = template
    contents = contents.replace('__HEADER__', header)
    contents = contents.replace('__NAV__', nav)
    contents = contents.replace('__ACTIVE0__', pages[page].active[0])
    contents = contents.replace('__ACTIVE1__', pages[page].active[1])
    contents = contents.replace('__ACTIVE2__', pages[page].active[2])
    contents = contents.replace('__ACTIVE3__', pages[page].active[3])
    contents = contents.replace('__FOOTER__', footer)

    contents = contents.replace('__KEY__', page)
    contents = contents.replace('__TITLE__', pages[page].title)
    contents = contents.replace('__DESC__', pages[page].desc)

    with open('index_' + page + '.html', 'w') as f:
        print(contents, file=f)


outputfiles = {
    "template/cover.html" : "index.html",
    "template/about.html" : "index_about.html",
    }

for inputfile in outputfiles:
    print(inputfile + ' => ' + outputfiles[inputfile])
    with open(inputfile, 'r') as f:
        contents = f.read()
        contents = contents.replace('__HEADER__', header)
        contents = contents.replace('__NAV__', nav)
        contents = contents.replace('__ACTIVE0__', '')
        contents = contents.replace('__ACTIVE1__', '')
        contents = contents.replace('__ACTIVE2__', '')
        contents = contents.replace('__ACTIVE3__', '')
        contents = contents.replace('__FOOTER__', footer)
        
    with open(outputfiles[inputfile], 'w') as f:
        print(contents, file=f)
