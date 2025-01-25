# Manga InDesign Scripts

#### [MakeHorizontalTextFrames](MakeHorizontalTextFrames.js)
To make horizontal text frames in the same position as existing vertical text frames in an InDesign document
1. Make sure all vertical text frames have the default text frame object style applied
2. Edit the text frame object style to open Object Style Options, and set Auto-Sizing in Text Frame Auto Size Options to "Height and Width" with "No Line Breaks" enabled
    - Choose the auto-sizing source direction according to how the vertical text frames are centered in the document
    - For horizontally center-aligned frames, choose the arrow in the top center
    - For horizontally top-aligned frames, choose the arrow in the top right
3. Edit the text frame object style again to turn off Auto-Sizing in Text Frame Auto Size Options so that the created horizontal text frames are not affected
4. Run the script and choose the paragraph style to be applied to the created text frames as well as the target layer

Note: You can also adjust the height as well as the width ratio of the created horizontal text frames to the original vertical text frames through the ["Adjustable parameters" section](MakeHorizontalTextFrames.js#L4) of the script

#### [ReversePageNumberer](ReversePageNumberer.js)
To add page numbers to an InDesign document with a backward left-to-right layout
1. Create a new parent page, for example: Prefix "C" with the name "PageNumber"
2. Create a new layer for page numbers, for example: "Page Numbers"
3. Inside the new parent, insert blank text frames on the left and right pages with your page number's preferred style or formatting
4. For each page you'd like to insert a page number on, put the page in focus and run the script
    - You can also select individual pages through the pages panel by double-clicking a page then then running the script

Note: You can also adjust the page number layer, parent names, starting page number, and the padding option through the ["Adjustable parameters" section](ReversePageNumberer.js#L6) of the script
