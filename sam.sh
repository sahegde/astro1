#! /bin/bash
whiptail —yesno "Did you already know whiptail?" —yes-button "Yes, I did" —no-button "No, never heard of it"  10 70
CHOICEs=$?

echo $CHOICE
