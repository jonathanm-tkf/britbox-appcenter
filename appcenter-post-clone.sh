COCOAPODS_VER=sed -n -e 's/^COCOAPODS: \([0-9.]*\)/\1/p' Podfile.lock
if test -z "$COCOAPODS_VER"
then
COCOAPODS_VER=1.7.5
fi

echo "Installing CocoaPods version $COCOAPODS_VER"
sudo gem install cocoapods -v $COCOAPODS_VER
