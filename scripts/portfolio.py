# from os import listdir

# This file loops through a folder of images and gets a list of all of them
# directory = './i'

# files = [f for f in listdir(directory) if f.endswith(".jpg")]

# print('files: ', files)

sections = [
    {
        "name": 'Featured',
        "imgs": ['McCurry-2023.jpg', 'The-Green-Knight-2022.jpg', 'Eduardo-2021.jpg', 'Girma,-Ethiopian-farmer-2021.jpg']
    },
    {
        "name": 'Commissioned',
        "imgs": [
            'Bowser-2023.jpg',
            'Daniel-Comboni-2023.jpg',
            'CHANS-Lab-2022.jpg',
            'Louis-2022.jpg',
            'Cat-and-family-2021.jpg', 'For-Ilke-2021.jpg', 'Hiking-buddies-2021.jpg',
            'Philippe-and-Catarina-2020.jpg'
        ]
    },
    {
        "name": 'For fun',
        "imgs": [
            'Hyena-1-2020.jpg', 'Hyena-2-2020.jpg', 'Hyena-3-2020.jpg', 'Hyena-4-2020.jpg', 'Joe-and-Laurie-2020.jpg', 'Leon-2020.jpg',
            'Little-Women-2019.jpg', 'Sketch-2019.jpg', 'Sketch-2-2019.jpg', 'V-for-Vendetta-2019.jpg',
            'Peacock-Jumping-Spider-2017.jpg', 'Seiser-Alm-2017.jpg',
            'Javier-Bardem-2016.jpg'
        ]
    },
    {
        "name": 'Earlier works',
        "imgs": [
            'Ducklings-2018.jpg',
            'Coeur-de-Pirate-2016.jpg', 'Tiger-in-snow-2016.jpg', 'Trapped-2016.jpg',
            'Ben-Howard-2015.jpg', 'Batman-2015.jpg', 'Hear-me-roar-2015.jpg', 'Iron-Man-2015.jpg', 'Jägermeister-2015.jpg', 'Mads-Mikkelsen-2015.jpg', 'Patrick-Watson-2015.jpg', 'Pointilism-Lion-2015.jpg', 'The-Head-and-the-Heart-2015.jpg', 'Wolverine-2015.jpg',
            'Breaking-Bad-2014.jpg', 'Wiz-Khalifa-2014.jpg',
            'Leonardo-Dicaprio-2013.jpg'
        ]
    }
]

#   <a href="i/Pointilism-Lion-2018.jpg">
#     <figure>
#       <img class="pure-img" src="i/Pointilism-Lion-2018.jpg" alt="Pointilism Lion">
#       <figcaption>
#         <span>Pointilism Lion</span>
#         <span>2018</span>
#       </figcaption>
#     </figure>
#   </a>

with open('./scripts/portfolio.html', 'w') as file:
    for section in sections:

        file.write('<div class="year">\n')
        file.write('<div class="subheading">\n')
        file.write('<h2>{}</h2>\n'.format(section.get('name')))
        file.write('</div>\n')
        file.write('<div class="pics__row">\n\n')

        for img in section.get('imgs'):

            # remove file ending
            img_no_ending = img.split('.')[0]

            img_tokens = img_no_ending.split('-')
            # get year
            img_year = img_tokens.pop()
            # get name
            img_name = " ".join(img_tokens)

            file.write('<a href="i/{}">\n'.format(img))
            file.write(
                '<img class="pure-img" src="i/{}" alt="{}">\n'.format(img, img_name))
            file.write('<figure>\n')
            file.write('<figcaption>\n')
            file.write('<span>{}</span>\n'.format(img_name))
            file.write('<span>{}</span>\n'.format(img_year))
            file.write('</figcaption>\n')
            file.write('</figure>\n')
            file.write('</a>\n\n')

        file.write('</div> <!-- end of .pics__row (end of the row)-->\n')
        file.write('</div> <!-- end of .year -->\n\n\n')
