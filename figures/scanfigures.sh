#!/bin/bash

dir=${1:-cook}
outf=fig_${dir}.js

for i in `ls -d ${dir}/*` ; do echo $i >> sorttemp.txt ; done

echo "figures[\"${dir}\"] = {};" > $outf
echo >> $outf

for i in `sort -f sorttemp.txt`
do
    [[ $i != *.jpg || $i == *thumb* ]] && continue
    echo $i
    key2=${i%%.*}
    cap=${key2}.txt
    key=${key2##*/}
    thumb=$i
    [[ -f ${key2}-thumb.jpg ]] && thumb=${key2}-thumb.jpg
    caption=`cat $cap`
    # echo $cap
    echo "figures[\"${dir}\"][\"$key\"] = {" >> $outf
    echo "    imglink : \"figures/$i\"," >> $outf
    echo "    thumbnail : \"figures/${thumb}\"," >> $outf
    echo -n "    caption : \"" >> $outf
    echo -n $caption >> $outf
    echo "\"," >> $outf
    echo "};" >> $outf
    echo >> $outf
done

rm sorttemp.txt
